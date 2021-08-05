<template>
	<form @submit.prevent="onSubmit" class="flex flex_column gap-y_3">
		<div class="form-group">
			<InputText
				:inputId="'programTitleInput'"
				v-model="form.label"
				:required="true"
				>Title</InputText
			>
		</div>		<div class="form-group">
			<InputText
				:inputId="'programTitleInput'"
				v-model="form.category"
				:required="true"
				>Category</InputText
			>
		</div>
	</form>
</template>

<script>
import { createTag } from '@/firebase';
import InputText from '../../Origami/src/components/BasicForms/Input.Text.vue';


export default {
	components: { InputText},
	methods: {

		async onSubmit() {
			let id = await createTag({ ... this.form });
			this.documentID = id;
			this.$emit('onClose');
		}
	},
	data() {
		return {
			documentID: -1,
			form: {
				label: '',
				category: '',
			}
		}
	},

}
</script>

<style scoped>
</style>