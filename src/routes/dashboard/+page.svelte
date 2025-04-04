<script lang="ts">
    import Logo from '$lib/components/reusable/Logo.svelte';
    import { Button } from '$lib/components/ui/button';

</script>

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
    </div>
    
    <!-- login buttons -->
    <div class="flex flex-row items-center space-x-5 mr-5">
        <Button class="h-8" href="/dashboard/sheets">
            Sheets
        </Button>        
        <Button class="h-8" href="/dashboard/campaigns">
            Campaigns
        </Button>
        <Button class="h-8" variant="outline" href="/dashboard/settings">
            Settings
        </Button>
    </div>
</nav>