export const metadata = {
  title: "Simple Invoice Maker",
  description: "Create and print simple invoices in your browser.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          backgroundColor: "#f3f4f6",
        }}
      >
        {children}
      </body>
    </html>
  );
}
