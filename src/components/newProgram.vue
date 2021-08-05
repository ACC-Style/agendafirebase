<template>
	<form @submit.prevent="onSubmit" class="flex flex_column gap-y_3">
		<div class="form-group">
			<InputText
				:inputId="'programTitleInput'"
				v-model="form.label"
				:required="true"
				>Title</InputText
			>
		</div>
		<div class="form-group">
			<InputSelect :options="typeOptions">Program Type</InputSelect>
		</div>
		<FieldSetGroup>
			<template v-slot:legend>Timing of the Program</template>
			<div class="form-group">
				<InputText
					:type="'date'"
					v-model="form.startDate"
					:required="true"
					>StartDate</InputText
				>
			</div>
			<div class="form-group">
				<InputText
					:type="'date'"
					v-model="form.endDate"
					:required="true"
					>StartDate</InputText
				>
			</div>
		</FieldSetGroup>
		<FieldSetGroup :state="'accent'">
			<template v-slot:legend>Prototype Chart Data</template>
			<div class="form-group">
				<InputText
					:type="'number'"
					v-model.number="form.chartData[0].count"
					>Channels</InputText
				>
			</div>
			<div class="form-group">
				<InputText
					:type="'number'"
					v-model.number="form.chartData[1].count"
					>Complete</InputText
				>
			</div>
			<div class="form-group">
				<InputText
					:type="'number'"
					v-model.number="form.chartData[2].count"
					>Incomplete</InputText
				>
			</div>
			<div class="form-group">
				<InputText
					:type="'number'"
					v-model.number="form.chartData[3].count"
					>Missing</InputText
				>
			</div>
		</FieldSetGroup>
		<FieldSetGroup :state="'accent'">
			<template v-slot:legend>Prototype Credit Data</template>
			<div class="form-group">
				<InputText
					:type="'number'"
					v-model.number="form.credits[0].count"
					>CME</InputText
				>
			</div>
			<div class="form-group">
				<InputText
					:type="'number'"
					v-model.number="form.credits[1].count"
					>CNE</InputText
				>
			</div>
			<div class="form-group">
				<InputText
					:type="'number'"
					v-model.number="form.credits[2].count"
					>COP</InputText
				>
			</div>
		</FieldSetGroup>
	</form>
</template>

<script>
import { createProgram } from '@/firebase';
import InputText from '../../Origami/src/components/BasicForms/Input.Text.vue';
import InputSelect from '../../Origami/src/components/BasicForms/Input.Select.vue';
import FieldSetGroup from "../../Origami/src/components/BasicForms/FieldSetGroup.vue";


export default {
	components: { InputText, InputSelect, FieldSetGroup },
	methods: {

		async onSubmit() {
			let id = await createProgram({ ... this.form });
			this.$emit('onClose');
			this.documentID = id;
		}
	},
	data() {
		return {
			documentID: -1,
			typeOptions: ["Streaming EDU",
				"Conference Ondemand",
				"Live Conference",
				"Edu Package"],
			form: {
				label: '',
				chartData: [{
					count: 0,
					label: 'Channels',
					color: 'primary',
					excludeFromTotal: true
				}, {
					count: 0,
					label: 'Complete',
					color: 'success'
				}, {
					count: 0,
					label: 'Incomplete',
					color: 'warning'
				}, {
					count: 0,
					label: 'Missing Source',
					color: 'alert'
				}],
				credits: [{
					label: 'CME',
					cssClass: 'CME',
					count: 0
				}, {
					label: 'CNE',
					cssClass: 'CNE',
					count: 0
				}, {
					label: 'COP',
					cssClass: 'COP',
					count: 0
				}]
			}
		}
	},

}
</script>

<style scoped>
</style>