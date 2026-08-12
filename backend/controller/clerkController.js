const Clerk = require("../modals/ClerkUser");
const { Webhook } = require("svix");

exports.clerkWebhook = async (req, res) => {
  try {
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing Svix headers",
      });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const event = wh.verify(req.body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    console.log("here is events --", event);

    const { type, data } = event;

    console.log(`Webhook received: ${type}`);

    // Find the PRIMARY email
    const primaryEmail = data.email_addresses?.find(
      (email) => email.id === data.primary_email_address_id
    );

    const email = primaryEmail?.email_address || "";

    console.log("Primary email:", email);

    switch (type) {
      case "user.created":
        await Clerk.create({
          clerkId: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: email,
          imageUrl: data.image_url,
        });

        console.log(
          `User Created: ${data.id} (${email})`
        );

        break;

      case "user.updated":
        await Clerk.findOneAndUpdate(
          { clerkId: data.id },
          {
            firstName: data.first_name,
            lastName: data.last_name,
            email: email,
            imageUrl: data.image_url,
          },
          {
            new: true,
            runValidators: true,
          }
        );

        console.log(
          `User Updated: ${data.id} (${email})`
        );

        break;

      case "user.deleted":
        await Clerk.findOneAndDelete({
          clerkId: data.id,
        });

        console.log("User deleted:", data.id);

        break;

      default:
        console.log("Unhandled event:", type);
    }

    res.status(200).json({
      success: true,
    });

  } catch (err) {
    console.error("WEBHOOK ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};