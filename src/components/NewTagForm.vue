<template>
	<form @submit.prevent="onSubmit" class="flex flex_column gap-y_3">
		<div class="form-group">
			<InputSelects
			:inputId="'programTitleInput'"
				v-model="category"
				@input="(event)=>{category = event}"
				:required="true"
				:options="categoriesOptions"
			>Category</InputSelects>
		</div>
		<div class="form-group">
			<InputText
				:inputId="'programTitleInput'"
				v-model="label"
				:required="true"
				>Title</InputText
			>
		</div>		
	</form>
</template>

<script>
import { createTag } from '@/firebase';
import InputText from '../../Origami/src/components/BasicForms/Input.Text.vue';
import InputSelects from '../../Origami/src/components/BasicForms/Input.Select.vue';


export default {
	components: { InputText,InputSelects},
	methods: {

		async onSubmit() {
			let id = await createTag({ ... this.form });
			this.documentID = id;
			this.$emit('onClose');
		}
	},
	data() {
		return {
			categoriesOptions:[{value:'Format Type'},{value:'Genre'},{value:'Language'},{value:'Location'},{value:'Organization'},{value:'Person'},{value:'Place'},{value:'Source'},{value:'Subject'},{value:'Time Period'},{value:'Work'}],
			documentID: -1,
			
				label: '',
				category: 'none',
			
		}
	},

}
</script>

<style scoped>
</style>