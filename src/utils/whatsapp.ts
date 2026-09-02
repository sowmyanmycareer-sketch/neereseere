import { CartItem, CustomerOrderDetails, SareeProduct } from '../types';
import { OFFICIAL_WHATSAPP_NUMBER } from '../data/sarees';

/**
 * Formats multi-item cart order for WhatsApp
 */
export function generateCartWhatsAppUrl(
  items: CartItem[],
  customer: CustomerOrderDetails,
  totalAmount: number,
  discountCode?: string,
  discountAmount: number = 0
): { url: string; rawMessage: string } {
  const itemsText = items
    .map(
      (item, idx) =>
        `*${idx + 1}. ${item.product.name}*\n` +
        `   • Code: *${item.product.code}*\n` +
        `   • Fabric: ${item.product.fabric}\n` +
        `   • Color: ${item.product.color}\n` +
        `   • Quantity: ${item.quantity}\n` +
        `   • Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
    )
    .join('\n\n');

  const finalTotal = totalAmount - discountAmount;

  const rawMessage = 
`🙏 *Namaskara Neere Seere Team!*
I would like to place an order from your website catalog:

🛍️ *ORDER DETAILS:*
---------------------------------
${itemsText}
---------------------------------
💰 *Subtotal:* ₹${totalAmount.toLocaleString('en-IN')}
${discountAmount > 0 ? `🎟️ *Discount (${discountCode || 'Applied'}):* -₹${discountAmount.toLocaleString('en-IN')}\n` : ''}✨ *Total Payable:* *₹${finalTotal.toLocaleString('en-IN')}*
🚚 *Shipping:* FREE (Standard Express)

📦 *DELIVERY ADDRESS:*
• *Name:* ${customer.fullName}
• *Phone:* ${customer.phoneNumber}${customer.altPhoneNumber ? ` / ${customer.altPhoneNumber}` : ''}
${customer.email ? `• *Email:* ${customer.email}\n` : ''}• *Address:* ${customer.addressLine1}${customer.addressLine2 ? `, ${customer.addressLine2}` : ''}
${customer.landmark ? `• *Landmark:* ${customer.landmark}\n` : ''}• *City & State:* ${customer.city}, ${customer.state}
• *Pincode:* ${customer.pincode}
${customer.orderNotes ? `\n📝 *Notes:* ${customer.orderNotes}` : ''}

Please confirm stock availability and share your UPI / Payment details to proceed. Thank you! ❤`;

  const encodedMessage = encodeURIComponent(rawMessage);
  const url = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return { url, rawMessage };
}

/**
 * Formats single product direct WhatsApp buy/inquire
 */
export function generateSingleProductWhatsAppUrl(
  product: SareeProduct,
  actionType: 'buy' | 'inquiry' | 'videocall' = 'buy'
): { url: string; rawMessage: string } {
  let rawMessage = '';

  if (actionType === 'videocall') {
    rawMessage = 
`🙏 *Namaskara Neere Seere!*
I would like to request a *5-minute live WhatsApp Video Call* to see the actual drape & pallu of:

🥻 *Saree:* ${product.name}
🏷️ *Code:* ${product.code}
💰 *Price:* ₹${product.price.toLocaleString('en-IN')}
🎨 *Color:* ${product.color}

Please let me know when your team is available for a quick live preview call. Thank you!`;
  } else if (actionType === 'inquiry') {
    rawMessage = 
`🙏 *Namaskara Neere Seere!*
I have a quick question about:

🥻 *Saree:* ${product.name} (${product.kannadaName})
🏷️ *Code:* ${product.code}
💰 *Price:* ₹${product.price.toLocaleString('en-IN')}
🧵 *Fabric:* ${product.fabric}

Could you please share more drape pictures/videos and available matching blouse options?`;
  } else {
    rawMessage = 
`🙏 *Namaskara Neere Seere!*
I would like to order this saree:

🥻 *Saree:* ${product.name}
🏷️ *Code:* ${product.code}
💰 *Price:* ₹${product.price.toLocaleString('en-IN')} (Original: ₹${product.originalPrice.toLocaleString('en-IN')})
🎨 *Color:* ${product.color}
🧵 *Fabric:* ${product.fabric}
📦 *Blouse:* ${product.blousePiece}

Please confirm if this piece is ready to dispatch and share UPI payment details. Thank you! ❤`;
  }

  const encodedMessage = encodeURIComponent(rawMessage);
  const url = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return { url, rawMessage };
}

/**
 * General concierge chat
 */
export function generateGeneralInquiryWhatsAppUrl(queryType: string = 'General Inquiry'): string {
  const message = 
`🙏 *Namaskara Neere Seere (ನೀರೆ ಸೀರೆ)!*
I am visiting your website and would like assistance with: *${queryType}*.

Please guide me with saree selection, custom bridal requirements, or live video shopping. Thank you!`;
  
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
