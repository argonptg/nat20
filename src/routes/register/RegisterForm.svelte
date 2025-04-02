<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { registerForm, type RegisterForm } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms/client';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<RegisterForm>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(registerForm)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.username} />
                <Form.FieldErrors />
			{/snippet}
		</Form.Control>
	</Form.Field>
    <Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} />
                <Form.FieldErrors />
			{/snippet}
		</Form.Control>
	</Form.Field>
    <Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input type="password" {...props} bind:value={$formData.password} />
                <Form.FieldErrors />
			{/snippet}
		</Form.Control>
	</Form.Field>
    <Form.Field {form} name="passwordConfirm">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password Confirm</Form.Label>
				<Input type="password" {...props} bind:value={$formData.passwordConfirm} />
                <Form.FieldErrors />
			{/snippet}
		</Form.Control>
	</Form.Field>
    <Form.Field {form} name="acceptTerms">
		<Form.Control>
            {#snippet children({ props })}
                <div class="flex flex-row items-center space-x-2">
                    <Checkbox {...props} bind:checked={$formData.acceptTerms}/>
                    <Form.Label>I agree to the terms of service</Form.Label>
                </div>
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Form.Button class="mt-5 w-full">Register</Form.Button>
</form>