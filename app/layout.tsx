import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'MaterialIQ — Dubai material sourcing',description:'Source fit-out materials, compare listed AED prices and build your project estimate with transparent supplier data.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
