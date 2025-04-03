<script lang="ts">
    import type { PageData } from "./$types.js";
    import LoginForm from "./LoginForm.svelte";
    import * as Card from "$lib/components/ui/card/";
	  import Logo from "$lib/components/reusable/Logo.svelte";
    let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col items-center py-20">
    <Card.Root class="w-[28%]">
      <Card.Header>
        <Card.Title class="flex flex-row items-center">
          <Logo class="w-7"/>  <span class="text-xl ml-2"> Ready to roll? </span>
        </Card.Title>
        <Card.Description>Log in and get back to crafting epic heroes!</Card.Description>
      </Card.Header>
      <Card.Content>
        <LoginForm {data} />
      </Card.Content>
    </Card.Root>
</div>