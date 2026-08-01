const Clerk = require("../modals/ClerkUser");
const { Webhook } = require("svix");
// have to made lots of changes
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
    // Create a webhook verifier using Clerk's webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    // Verify the incoming webhook request
    const event = wh.verify(req.body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    console.log("here is events --", event);
    const { type, data } = event;
    console.log(`Webhook received: ${type}`);

    switch (type) {
      case "user.created":
        await Clerk.create({
          clerkId: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email_addresses?.[0]?.email_address || "",
          imageUrl: data.image_url,
        });
        console.log(
          `User Created: ${data.id} (${data.email_addresses?.[0]?.email_address})`,
        );

        break;

      case "user.updated":
        await Clerk.findOneAndUpdate(
          { clerkId: data.id },
          {
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email_addresses?.[0]?.email_address || "",
            imageUrl: data.image_url,
          },
          { new: true,
             runValidators: true ,
            },
        );
        console.log(`User Updated: ${data.id} (${data.email_addresses?.[0]?.email_address})`);

        break;

      case "user.deleted":
        await Clerk.findOneAndDelete({
          clerkId: data.id,
        });
        console.log("User deleted:", data);

        break;

      default:
        console.log("Unhandled event:", type);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "inter server error" });
  }
};
