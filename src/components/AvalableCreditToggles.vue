<template>
	<div>
		<h3 class="font_display font-size_up-2">Grant Credit Access</h3>
		<p class="font-size_down-1 c_black-6">
			Credit types are calculated from the credits available from the
			associated sessions
		</p>
		<ul class="list-group ul_none m-b_5 font-size_up">
			<li
				v-for="(credit, index) in value.filter(credit=>credit.count>0)"
				:key="'c_' + index"
				class="
					lh_2
					p-y_2
					br_0 br_solid br_black-2
					flex flex_row inline-flex
					justify_start align_center
				"
				:class="{ 'br-t_1': index > 0 }"
			>
				<SwitchToggle
					:size="'tiny'"
					:corner="'radius'"
					:notActiveIcon="'fa-times'"
					:activeState="'primary'"
					:activeIcon="'fa-check'"
					:notActiveState="'secondary'"
					:value="value[index].active"
					@input="onInput(index, $event)"
				>
					<span class="self_center inline-block" v-html="creditLabel(credit.type)">COP</span>
					<span
						v-if="credit.type != 'COP'"
						class="c_primary flex_auto self_center p-l_2 opacity_7"
						>({{ credit.count }})</span
					></SwitchToggle
				>
			</li>
		</ul>
	</div>
</template>

<script>
import SwitchToggle from "../../Origami/src/components/subComponents/SwitchToggle.vue";
import { creditTypes } from "./CreditTypes.js";
export default {
	name: "AvalableCreditToggles",
	props: {
		value: { type: Array, default: () => [] },

	},
	data() {
		return {
			creditTypes: creditTypes,
		}
	},
	components: { SwitchToggle },
	methods: {
		creditLabel(type) {
			console.log(this.creditTypes);
			let creditIndex = this.creditTypes.findIndex(c => c.type == type);
			console.log(this.creditTypes[creditIndex].shortName)
			return this.creditTypes[creditIndex].shortName;
		},
		onInput(index, event) {
			let v = this.value;
			console.log(event);
			console.log(v[index].active);
			v[index].active = event;
			console.log(v[index].active);
			this.$emit('input', v);
		}
	},
}
</script>

<style scoped>
</style>