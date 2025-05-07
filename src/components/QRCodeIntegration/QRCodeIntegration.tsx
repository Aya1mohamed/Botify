import React from 'react';
import Image from "next/image";

const QRCodeIntegration = () => {
  return (
    <div className="bg-white p-4 rounded-md border w-fit">
      <Image
        src="/qrcode.png" 
        alt="QR Code"
        width={160}
        height={160}
      />
    </div>
  );
};

export default QRCodeIntegration;
