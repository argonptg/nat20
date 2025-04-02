<script lang="ts">
    import type { PageData } from "./$types.js";
    import RegisterForm from "./RegisterForm.svelte";
    import * as Card from "$lib/components/ui/card/";
    let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col items-center py-20">
    <Card.Root class="w-[28%]">
      <Card.Header>
        <Card.Title class="text-xl">Create an account</Card.Title>
        <Card.Description>Your quest starts here! Just a quick signup away.</Card.Description>
      </Card.Header>
      <Card.Content>
        <RegisterForm {data} />
      </Card.Content>
    </Card.Root>
</div>