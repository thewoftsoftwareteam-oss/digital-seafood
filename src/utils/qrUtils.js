import QRCode from 'qrcode';

/**
 * Generates QR Code Data URL for a specific table or menu URL
 */
export async function generateTableQrDataUrl(tableNumber, baseUrl) {
  const url = `${baseUrl || window.location.origin}?table=${tableNumber}`;
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width: 320,
      margin: 2,
      color: {
        dark: '#141416', // Solid charcoal dark
        light: '#ffffff'  // Solid white background
      },
      errorCorrectionLevel: 'H'
    });
    return { success: true, dataUrl, url };
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return { success: false, error: err };
  }
}
