import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider } from "../utils/ThemeContext";
import ThemeProvider from "../utils/ThemeProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Bhuvanesh Prasad",
    template: "%s | Bhuvanesh Prasad",
    keywords: ["Bhuvanesh", "Bhuvanesh Prasad", "Bhuvi", "therealbhuvi", "bhuvaneshprasad", "Data Analyst", "Data Scientist", "Personal Finance", "Tech"],
  },
  description: "Portfolio Website of Bhuvanesh Prasad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContextProvider>
          <ThemeProvider>
          <Navbar />
            {children}
          <Footer/>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
