declare module 'react-qr-scanner' {
    import { ComponentType, CSSProperties } from 'react';
  
    interface QrScannerProps {
      delay?: number;
      onError?: (error: any) => void;
      onScan?: (data: string | null) => void;
      style?: CSSProperties;
    }
  
    const QrScanner: ComponentType<QrScannerProps>;
  
    export default QrScanner;
  }
  