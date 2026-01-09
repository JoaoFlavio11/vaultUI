import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider defaultTheme="dark" storageKey="vaultui-theme">
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</ThemeProvider>
	</QueryClientProvider>
);

export default App;
