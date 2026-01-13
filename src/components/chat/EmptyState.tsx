/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { MessageSquare, Shield, Sparkles, Zap } from "lucide-react";

const EmptyState = () => {
	const features = [
		{
			icon: Sparkles,
			title: "Assistente Inteligente",
			description: "Respostas contextuais e precisas",
		},
		{
			icon: Zap,
			title: "Respostas Rápidas",
			description: "Processamento local via Ollama",
		},
		{
			icon: Shield,
			title: "Privacidade Total",
			description: "Seus dados nunca saem da sua máquina",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center h-full px-4 py-8">
			<div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
				<MessageSquare className="w-8 h-8 text-primary" />
			</div>

			<h2 className="text-2xl font-semibold text-foreground mb-2">
				Bem-vindo ao VaultUI
			</h2>

			<p className="text-muted-foreground text-center max-w-md mb-8">
				Sua interface para agentes de IA. Inicie uma conversa para começar.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl w-full">
				{features.map((feature, index) => (
					<div
						key={index}
						className="flex flex-col items-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
					>
						<feature.icon className="w-6 h-6 text-primary mb-3" />
						<h3 className="font-medium text-foreground text-sm mb-1">
							{feature.title}
						</h3>
						<p className="text-xs text-muted-foreground text-center">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default EmptyState;
