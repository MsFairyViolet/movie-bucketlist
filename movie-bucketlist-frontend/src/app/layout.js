import "./globals.css";
export const metadata = {
  title: "Movie Bucketlist",
  description: "IMDB's top 250 movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
