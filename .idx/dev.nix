{ pkgs, ... }: {
	# Specify the nixpkgs channel to use
	channel = "24.11"; # Ensure this matches the version where Bun is available	
	# Define the packages to be installed in the environment
	packages = [
	  	pkgs.bun
	];	
	# Configure IDX-specific settings
	idx = {
	  	# List of extensions to install from OpenVSX
	  	extensions = [
	  	  	"svelte.svelte-vscode"
	  	  	"Selemondev.vscode-shadcn-svelte"
	  	  	"Chanzhaoyu.svelte-5-snippets"
	  	  	"bradlc.vscode-tailwindcss"
	  	  	"redwan-hossain.auto-rename-tag-clone"
	  	  	"aaron-bond.better-comments"
	  	  	"esbenp.prettier-vscode"
	  	  	"inlang.vs-code-extension"
	  	  	"redhat.vscode-xml"
	  	  	"redhat.vscode-yaml"
	  	  	"oven.bun-vscode"
	  	];
	};
}