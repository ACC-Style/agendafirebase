<template>
	<HoverContainer
		:actionIcon="actionIcon"
		:actionColor="actionColor"
		:actionTask="actionTask"
		:actionLabel="'edit channel'"
		@onClick="$emit('onClick', $event)"
	>
		<header class="flex flex_row br_black-2 br_solid br-b_1 justify_center">
			<h4
				class="
					flex_auto
					self_center
					p-l_4
					m_0
					lh_1
					font-size_up-1
					p-y_3
				"
			>
				{{ label }}
			</h4>
			<div class="flex flex_column" @mouseenter="
					() => {
						actionColor = 'alert';
						actionIcon = ' fa-trash-alt ';
						actionTask = 'delete';
					}
				"
				@mouseleave="
					() => {
						actionColor = actionColorDefault;
						actionIcon = actionIconDefault;
						actionTask = actionTaskDefault;
					}
				">
                <Btn
				class="self_center flex_grow"
				size="tiny"
				state="empty"
				@onClick="removePresentation(id)"
				
				>remove</Btn
			>
            </div>
		</header>
		<main class="br-b_1 br_solid br_black-1 p_4 p-y_3">
			<div
				class="
					flex flex_inline flex_wrap
					gap-x_4
					c_black-7
					font-size_down
				"
			>
				<span
					><i class="far fa-stopwatch c_primary p-r_3"></i
					>{{ duration }}min</span
				>
				<span
					><i class="far fa-archive c_primary p-r_3"></i
					>
                    <span v-html="attachments.length"></span>
                     attachments
				</span>
                <span
					><i class="far fa-user c_primary p-r_3"></i
					>
                    <span v-html="faculty.length"></span>
                     faculty
				</span>
			</div>
		</main>
	</HoverContainer>
</template>

<script>
import HoverContainer from "../../Origami/src/components/AdvancedContainers/hoverContainer.vue";
import Btn from "../../Origami/src/components/subComponents/Btn.vue";
export default {
	components: { HoverContainer, Btn },
	props: {
		label: { type: String, default: "label of Presentation is missing" },
		type: { type: String, default: "presentation" },
		id: { type: String, default: "id" },
		mediasitePEID: { type: String, default: "1564132" },
		attachments: { type: Array, default: () => ["foo"] },
		faculty: { type: Array, default: () => [{},{}] },
		duration: { type: Number, default: 0 },
		actionColorDefault: { type: String, default: 'accent' },
		actionIconDefault: { type: String, default: 'fa-pencil-alt' },
		actionTaskDefault: {
			type: String,
			default: 'edit',
			validator: function (value) {
				return ['edit', 'delete', 'navigateTo'].indexOf(value) !== -1;
			}
		}
	},
	data() {
		return {
			actionIcon: '',
			actionColor: '',
			actionTask: '',
		};
	},
	mounted() {
		this.actionIcon = this.actionColorDefault;
		this.actionColor = this.actionColorDefault;
		this.actionTask = this.actionTaskDefault;
        return true;
	},
    methods: {
        removePresentation(id) {return id;}
    }
};
</script>

<style scoped></style>
