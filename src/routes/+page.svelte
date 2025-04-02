<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Sword } from "@lucide/svelte/icons";
    import ModeSwitcher from "$lib/components/reusable/ModeSwitcher.svelte";
    import Logo from "$lib/components/reusable/Logo.svelte";
</script>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>

<nav
    class="
        border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 
        sticky top-0 z-50 w-full border-b backdrop-blur h-16 items-center flex flex-row
        justify-between 
    ">
    <!-- pages -->
    <div class="flex flex-row">
        <!-- logo -->
		<a href="/" class="flex flex-row items-center">
			<Logo class="w-8 h-8 ml-5"/>
			<h1 class="font-extrabold ml-2 text-lg">Nat20</h1>
		</a>

        <!-- links -!->
        <ul class="flex flex-row items-center list-none space-x-10 ml-8">
            <li class="text-foreground/40 hover:text-foreground transition-colors">
                <a href="/pricing">Pricing</a>
            </li>
            <li class="text-foreground/40 hover:text-foreground transition-colors">
                <a href="https://example.com">Features</a>
            </li>
        </ul> -->
    </div>
    
    <!-- login buttons -->
    <div class="flex flex-row items-center space-x-5 mr-5">
        <Button class="h-8" href="https://example.com">
            Login
        </Button>        
        <Button class="h-8" variant="outline" href="/register">
            Register
        </Button>
        <ModeSwitcher />
    </div>
</nav>

<div
  class="absolute top-10 h-full w-full bg-transparent 
  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
  bg-[size:42px_42px] z-0"
></div>

  <div class="relative z-10 h-screen bg-gradient-to-t from-background to-background/10">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-28 text-center">
      <div class="max-w-4xl mx-auto space-y-8">
        <h1 class="text-5xl md:text-7xl font-bold mt-10">
          Your Ultimate <br>
          Free D&D <span class="bg-gradient-to-r from-teal-400 to-teal-700 bg-clip-text text-transparent">Creator</span>
        </h1>
  
        <p class="text-xl text-stone-300 max-w-2xl mx-auto">
            No paywalls, unlike certain sites. No limits. Just great character sheets for your RPG adventures.
        </p>
  
        <div class="flex flex-col md:flex-row gap-4 justify-center py-8">
          <Button size="lg" class="text-lg h-14 px-8 gap-2">
            Begin Your Quest
            <Sword class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  
    <!-- Features Grid -->
  </div>