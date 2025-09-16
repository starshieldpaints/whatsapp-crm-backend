// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');
// const multer = require('multer');
// const FormData = require('form-data');
// const cors = require('cors');

// const app = express();
// const upload = multer();
// app.use(cors());
// app.use(express.json());

// const pinnApiKey = process.env.WHATSAPP_API_KEY;
// // Helper to generate axios headers
// function getHeaders(isFormData) {
//   const base = {
//     'apikey': pinnApiKey   // <-- Pinnacle expects this!
//   };
//   if (!isFormData) base['Content-Type'] = 'application/json';
//   return base;
// }
// // Example /templates endpoint — replace the array contents with real data fetched from Pinnacle API if needed
// app.get('/templates', async (req, res) => {
//   try {
//     const response = await axios.get('https://partnersv1.pinbot.ai/v3/{{phone_number_id}}/messages', { headers: getHeaders(false) });
//     // Process/transform response.data if needed
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// app.post('/send-message', async (req, res) => {
//   const {
//     to,
//     messageType,
//     text,
//     template,
//     mediaType,
//     mediaId,
//     mediaLink,
//     caption,
//     contact,
//     location,
//     list,
//     replyButton,
//     catalog,
//     carousel,
//     mom,
//     interactive
//   } = req.body;

//   if (!to || !messageType) {
//     return res.status(400).json({ error: "'to' and 'messageType' are required." });
//   }

//   const url = `https://partnersv1.pinbot.ai/v3/${to}/messages`;
//   let body;

//   switch (messageType.toLowerCase()) {
//     case 'text':
//       if (!text) return res.status(400).json({ error: "'text' field required for text messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "text",
//         text: { body: text }
//       };
//       break;

//     case 'template':
//       if (!template) return res.status(400).json({ error: "'template' object required for template messages" });
//       body = {
//         messaging_product: "whatsapp",
//         recipient_type: "individual",
//         to,
//         type: "template",
//         template: template
//       };
//       break;

//     case 'media':
//       if (!mediaType) return res.status(400).json({ error: "'mediaType' required for media messages" });
//       if (mediaId) {
//         // Media by Id
//         body = {
//           messaging_product: "whatsapp",
//           to,
//           type: mediaType,
//           [mediaType]: {
//             id: mediaId,
//             caption: caption || ""
//           }
//         };
//       } else if (mediaLink) {
//         // Media by Link
//         body = {
//           messaging_product: "whatsapp",
//           to,
//           type: mediaType,
//           [mediaType]: {
//             link: mediaLink,
//             caption: caption || ""
//           }
//         };
//       } else {
//         return res.status(400).json({ error: "Either 'mediaId' or 'mediaLink' required for media messages" });
//       }
//       break;

//     case 'contact':
//       if (!contact) return res.status(400).json({ error: "'contact' object required for contact messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "contacts",
//         contacts: [contact]
//       };
//       break;

//     case 'location':
//       if (!location) return res.status(400).json({ error: "'location' object required for location messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "location",
//         location
//       };
//       break;

//     case 'list':
//       if (!list) return res.status(400).json({ error: "'list' object required for list messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive: { type: "list", ...list }
//       };
//       break;

//     case 'replybutton':
//       if (!replyButton) return res.status(400).json({ error: "'replyButton' object required for reply button messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive: { type: "button", ...replyButton }
//       };
//       break;

//     case 'catalog':
//       if (!catalog) return res.status(400).json({ error: "'catalog' object required for catalog messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive: { type: "catalog", ...catalog }
//       };
//       break;

//     case 'carousel':
//       if (!carousel) return res.status(400).json({ error: "'carousel' object required for carousel messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive: { type: "carousel", ...carousel }
//       };
//       break;

//     case 'mom':
//       if (!mom) return res.status(400).json({ error: "'mom' field required for MOM messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "text",
//         text: { body: mom }
//       };
//       break;

//     case 'interactive':
//       if (!interactive) return res.status(400).json({ error: "'interactive' object required" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive
//       };
//       break;

//     default:
//       return res.status(400).json({ error: `Unsupported message type: ${messageType}` });
//   }

//   try {
//     const response = await axios.post(url, body, {
//       headers: getHeaders(false)
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(error.response?.status || 500).json({ error: error.message, details: error.response?.data });
//   }
// });

// // Media upload handler, if needed for media by upload (send media by link otherwise)
// // const upload = multer();
// app.post('/upload-media', upload.single('file'), async (req, res) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', req.file.buffer, req.file.originalname);

//     const response = await axios.post(
//       process.env.WHATSAPP_MEDIA_UPLOAD_URL,
//       formData,
//       { headers: { apikey: `Bearer ${pinnApiKey}`, ...formData.getHeaders() } }
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(error.response?.status || 500).json({ error: error.message, details: error.response?.data });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`WhatsApp backend running on port ${PORT}`));



// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');
// const multer = require('multer');
// const FormData = require('form-data');
// const cors = require('cors');

// const app = express();
// const upload = multer();
// app.use(cors());
// app.use(express.json());

// const pinnApiKey = process.env.WHATSAPP_API_KEY;

// // Helper to generate headers with apikey for Pinnacle API
// function getHeaders(isFormData) {
//   // Pinnacle wants only 'apikey', NOT 'Authorization'
//   const base = {
//     'apikey': pinnApiKey
//   };
//   if (!isFormData) base['Content-Type'] = 'application/json';
//   return base;
// }

// // Example /templates endpoint for local/testing
// app.get('/templates', (req, res) => {
//   res.json([
//     {
//       name: "welcome_message",
//       description: "Welcome New Customer",
//       variables: ["CustomerName", "ProductName"]
//     },
//     {
//       name: "promo_offer",
//       description: "Special Promotional Offer",
//       variables: ["CustomerName", "OfferCode"]
//     }
//     // Add or fetch actual template list from Pinnacle here!
//   ]);
// });

// app.post('/send-message', async (req, res) => {
//   const {
//     to,
//     messageType,
//     text,
//     template,
//     mediaType,
//     mediaId,
//     mediaLink,
//     caption,
//     contact,
//     location,
//     list,
//     replyButton,
//     catalog,
//     carousel,
//     mom,
//     interactive
//   } = req.body;

//   if (!to || !messageType) {
//     return res.status(400).json({ error: "'to' and 'messageType' are required." });
//   }

//   const url = `https://partnersv1.pinbot.ai/v3/${to}/messages`;
//   let body;

//   switch (messageType.toLowerCase()) {
//     case 'text':
//       if (!text) return res.status(400).json({ error: "'text' field required for text messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "text",
//         text: { body: text }
//       };
//       break;

//     case 'template':
//       if (!template) return res.status(400).json({ error: "'template' object required for template messages" });
//       body = {
//         messaging_product: "whatsapp",
//         recipient_type: "individual",
//         to,
//         type: "template",
//         template: template
//       };
//       break;

//     case 'media':
//       if (!mediaType) return res.status(400).json({ error: "'mediaType' required for media messages" });
//       if (mediaId) {
//         body = {
//           messaging_product: "whatsapp",
//           to,
//           type: mediaType,
//           [mediaType]: {
//             id: mediaId,
//             caption: caption || ""
//           }
//         };
//       } else if (mediaLink) {
//         body = {
//           messaging_product: "whatsapp",
//           to,
//           type: mediaType,
//           [mediaType]: {
//             link: mediaLink,
//             caption: caption || ""
//           }
//         };
//       } else {
//         return res.status(400).json({ error: "Either 'mediaId' or 'mediaLink' required for media messages" });
//       }
//       break;

//     case 'contact':
//       if (!contact) return res.status(400).json({ error: "'contact' object required for contact messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "contacts",
//         contacts: [contact]
//       };
//       break;

//     case 'location':
//       if (!location) return res.status(400).json({ error: "'location' object required for location messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "location",
//         location
//       };
//       break;

//     case 'list':
//       if (!list) return res.status(400).json({ error: "'list' object required for list messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive: { type: "list", ...list }
//       };
//       break;

//     case 'replybutton':
//       if (!replyButton) return res.status(400).json({ error: "'replyButton' object required for reply button messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive: { type: "button", ...replyButton }
//       };
//       break;

//     case 'catalog':
//       if (!catalog) return res.status(400).json({ error: "'catalog' object required for catalog messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive: { type: "catalog", ...catalog }
//       };
//       break;

//     case 'carousel':
//       if (!carousel) return res.status(400).json({ error: "'carousel' object required for carousel messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive: { type: "carousel", ...carousel }
//       };
//       break;

//     case 'mom':
//       if (!mom) return res.status(400).json({ error: "'mom' field required for MOM messages" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "text",
//         text: { body: mom }
//       };
//       break;

//     case 'interactive':
//       if (!interactive) return res.status(400).json({ error: "'interactive' object required" });
//       body = {
//         messaging_product: "whatsapp",
//         to,
//         type: "interactive",
//         interactive
//       };
//       break;

//     default:
//       return res.status(400).json({ error: `Unsupported message type: ${messageType}` });
//   }

//   try {
//     const response = await axios.post(url, body, {
//       headers: getHeaders(false)
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(error.response?.status || 500).json({ error: error.message, details: error.response?.data });
//   }
// });

// // Media upload (if needed) - be sure to set apikey without Bearer
// app.post('/upload-media', upload.single('file'), async (req, res) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', req.file.buffer, req.file.originalname);

//     const response = await axios.post(
//       process.env.WHATSAPP_MEDIA_UPLOAD_URL,
//       formData,
//       { headers: { apikey: pinnApiKey, ...formData.getHeaders() } }
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(error.response?.status || 500).json({ error: error.message, details: error.response?.data });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`WhatsApp backend running on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const cors = require('cors');

const app = express();
const upload = multer();
app.use(cors());
app.use(express.json());

// --- Set these in your .env: ---
const pinnApiKey = process.env.WHATSAPP_API_KEY;        // Your API key from Pinnacle
const phoneNumberId = process.env.PHONE_NUMBER_ID;      // Your business WhatsApp phone number ID (NOT the customer)

function getHeaders(isFormData) {
  const base = { 'apikey': pinnApiKey };
  if (!isFormData) base['Content-Type'] = 'application/json';
  return base;
}

// Example /templates endpoint with static data
app.get('/templates', (req, res) => {
  res.json([
    {
      name: "welcome_message",
      description: "Welcome New Customer",
      variables: ["CustomerName", "ProductName"]
    },
    {
      name: "promo_offer",
      description: "Special Promotional Offer",
      variables: ["CustomerName", "OfferCode"]
    }
    // Extend or fetch live data as needed
  ]);
});

// Main WhatsApp send endpoint
app.post('/send-message', async (req, res) => {
  const {
    to,              // <-- recipient (from CRM)
    messageType,
    text,
    template,
    mediaType,
    mediaId,
    mediaLink,
    caption,
    contact,
    location,
    list,
    replyButton,
    catalog,
    carousel,
    mom,
    interactive
  } = req.body;

  if (!to || !messageType) {
    return res.status(400).json({ error: "'to' and 'messageType' are required." });
  }

  // Use phoneNumberId (your business sender) in the URL, NOT the customer number
  const url = `https://partnersv1.pinbot.ai/v3/${phoneNumberId}/messages`;
  let body;

  switch (messageType.toLowerCase()) {
    case 'text':
      if (!text) return res.status(400).json({ error: "'text' field required for text messages" });
      body = {
        messaging_product: "whatsapp",
        to, // recipient from CRM
        type: "text",
        text: { body: text }
      };
      break;

    case 'template':
      if (!template) return res.status(400).json({ error: "'template' object required for template messages" });
      body = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "template",
        template: template
      };
      break;

    case 'media':
      if (!mediaType) return res.status(400).json({ error: "'mediaType' required for media messages" });
      if (mediaId) {
        body = {
          messaging_product: "whatsapp",
          to,
          type: mediaType,
          [mediaType]: {
            id: mediaId,
            caption: caption || ""
          }
        };
      } else if (mediaLink) {
        body = {
          messaging_product: "whatsapp",
          to,
          type: mediaType,
          [mediaType]: {
            link: mediaLink,
            caption: caption || ""
          }
        };
      } else {
        return res.status(400).json({ error: "Either 'mediaId' or 'mediaLink' required for media messages" });
      }
      break;

    case 'contact':
      if (!contact) return res.status(400).json({ error: "'contact' object required for contact messages" });
      body = {
        messaging_product: "whatsapp",
        to,
        type: "contacts",
        contacts: [contact]
      };
      break;

    case 'location':
      if (!location) return res.status(400).json({ error: "'location' object required for location messages" });
      body = {
        messaging_product: "whatsapp",
        to,
        type: "location",
        location
      };
      break;

    case 'list':
      if (!list) return res.status(400).json({ error: "'list' object required for list messages" });
      body = {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: { type: "list", ...list }
      };
      break;

    case 'replybutton':
      if (!replyButton) return res.status(400).json({ error: "'replyButton' object required for reply button messages" });
      body = {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: { type: "button", ...replyButton }
      };
      break;

    case 'catalog':
      if (!catalog) return res.status(400).json({ error: "'catalog' object required for catalog messages" });
      body = {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: { type: "catalog", ...catalog }
      };
      break;

    case 'carousel':
      if (!carousel) return res.status(400).json({ error: "'carousel' object required for carousel messages" });
      body = {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: { type: "carousel", ...carousel }
      };
      break;

    case 'mom':
      if (!mom) return res.status(400).json({ error: "'mom' field required for MOM messages" });
      body = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: mom }
      };
      break;

    case 'interactive':
      if (!interactive) return res.status(400).json({ error: "'interactive' object required" });
      body = {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive
      };
      break;

    default:
      return res.status(400).json({ error: `Unsupported message type: ${messageType}` });
  }

  try {
    const response = await axios.post(url, body, {
      headers: getHeaders(false)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message, details: error.response?.data });
  }
});

// Media upload if needed (set apikey header)
app.post('/upload-media', upload.single('file'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);

    const response = await axios.post(
      process.env.WHATSAPP_MEDIA_UPLOAD_URL,
      formData,
      { headers: { apikey: pinnApiKey, ...formData.getHeaders() } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message, details: error.response?.data });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`WhatsApp backend running on port ${PORT}`));
