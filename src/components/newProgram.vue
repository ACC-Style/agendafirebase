<template>
	<form @submit.prevent="onSubmit">

		<div class="form-group">
			<label for="label">label</label>
			<input
				type="text"
				v-model="form.label"
				class="form-control"
				required
			/>
		</div>
		<div class="form-group">
			<label for="label">StartDate</label>
			<input
				type="date"
				v-model="form.startDate"
				class="form-control"
				required
			/>
		</div>
		<div class="form-group">
			<label for="label">EndDate</label>
			<input
				type="date"
				v-model="form.endDate"
				class="form-control"
				required
			/>
		</div>
		<div class="form-group">
			<label for="label">Type</label>
			<select
				type="number"
				v-model.number="form.type"
				class="form-control"
				required
			>
			<option v-for="(option,index) in typeOptions" :key="'option_'+index" :value="option">{{option}}</option>
			<option value="Confernce">Confernce</option>
			
			</select>
		</div>
		<div class="form-group">
			<label for="label">chartData:Channels</label>
			<input
				type="number"
				v-model.number="form.chartData[0].count"
				class="form-control"
				required
			/>
		</div>
		<div class="form-group">
			<label for="label">chartData:Complete</label>
			<input
				type="number"
				v-model.number="form.chartData[1].count"
				class="form-control"
				required
			/>
		</div>
		<div class="form-group">
			<label for="label">chartData:Incomplete</label>
			<input
				type="number"
				v-model.number="form.chartData[2].count"
				class="form-control"
				required
			/>
		</div>
		<div class="form-group">
			<label for="label">chartData:Missing Source</label>
			<input
				type="number"
				v-model.number="form.chartData[3].count"
				class="form-control"
				required
			/>
		</div>
		<div class="form-group">
			<label for="label">Credits: CME</label>
			<input
				type="number"
				v-model.number="form.credits[0].count"
				class="form-control"
				required
			/>
		</div>
		<Btn @onCLick="onSubmit">Submit</Btn>
	</form>
</template>

<script>
import { createProgram } from '@/firebase';
import Btn from "../../Origami/src/components/subComponents/Btn.vue";

export default {
	components: {Btn},
    methods: {

        async onSubmit() {
            await createProgram({ ... this.form });
			this.$emit('onClose');
        }
    },
    data() {
        return {
			typeOptions:[
				"Streaming EDU",
				"Conference Ondemand",
				"Live Conference",
				"Edu Package"
			],
            form:  {
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
				}]
			}
        }
    },

}
</script>

<style scoped>
</style>