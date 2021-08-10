<template>
	<section>
		<div class="flex flex_inline bg_white p_3 br-b_1 br_solid br_black-3">
			<h3 class="font_display font_2 c_primary-n2 self_center m_0">
				<i class="far fa-vector-square c_primary"></i> Presentaions
			</h3>
			<Btn
				class="lh_1 p-x_3 m-l_auto self_center flex_none"
				:state="'secondary'"
				:size="'tiny'"
				:shadow="false"
				:corner="'round'"
				@onClick="newPresentation()"
				><i class="far p-r_3 p_1 fa-plus"></i> new
			</Btn>
			<Btn
				class="lh_1 p-x_3 m-l_3 self_center flex_none"
				:state="'secondary'"
				:size="'tiny'"
				:shadow="false"
				:corner="'round'"
				><i class="far p-r_3 p_1 fa-paperclip"></i> attach
			</Btn>
		</div>
		<ListLoader :list="presentations">
			<template v-slot:listEmpty>
				<ListEmptyCard>
					<template v-slot:header>No Presentations</template>
					There are no presentations for this session. Either start a
					new presentation or attach one from the library.
					<template v-slot:footer
						><div class="flex flex_inline gap-x_3">
							<Btn
								:state="'secondary'"
								:size="'small'"
								class="flex_auto"
								@onClick="newPresentation()"
								><i class="far p-r_3 p_1 fa-plus"></i> New</Btn
							><Btn
								@onClick="attachPresentation()"
								:state="'primary'"
								:size="'small'"
								class="flex_auto"
								><i class="far p-r_3 p_1 fa-paperclip"></i>
								Attach</Btn
							>
						</div></template
					>
				</ListEmptyCard>
			</template>
			<div class="br_black-3 br_solid br_1 bg_white">
				<header
					class="
						flex flex_row
						br_black-2 br_solid
						br-b_1
						justify_center
					"
				>
					<h4 class="flex_auto self_center p-l_4 m_0">
						New Presentation
					</h4>
					<Btn :state="'empty'" @onClick="removePresentation()"
						>remove</Btn
					>
				</header>
				<main class="p_4 flex flex_column gap-y_3">
					<InputText :value="''">Title</InputText>
					<InputText :icon="'fa-video'" :value="''"
						>Mediasite PEID</InputText
					>
					<InputTextAndButton :actionLabel="'Add Attachment'">
						Attachments
						<template v-slot:buttonLabel>
							<i
								class="
									far
									fa-paperclip
									self_center
									p-r_3:md
									font-size_down
								"
							></i>
							<span class="display_none inline:md"
								>Attach File</span
							>
						</template>
					</InputTextAndButton>
					<input-text
						icon="fa-stopwatch"
						postLabel="min"
						:value="0"
						:type="'number'"
						>Duration</input-text
					>
				</main>
				<header
					class="
						flex flex_row
						br_black-3 br_solid
						br-t_1
						justify_center
						p-y_3
						p-r_3
					"
				>
					<h4 class="flex_auto self_center p-l_4 m_0">Faculty</h4>
					<Btn
						class="lh_1 p-x_3 m-l_auto self_center flex_none"
						:state="'secondary'"
						:size="'tiny'"
						:shadow="false"
						:corner="'round'"
						@onClick="faculty = [{ role: '' }]"
						><i class="far p-r_3 p_1 fa-plus"></i> new
					</Btn>
					<Btn
						class="lh_1 p-x_3 m-l_3 self_center flex_none"
						:state="'secondary'"
						:size="'tiny'"
						:shadow="false"
						:corner="'round'"
						><i class="far p-r_3 p_1 fa-paperclip"></i> attach
					</Btn>
				</header>
				<ListLoader :list="faculty">
					<template v-slot:listEmpty>
						<ListEmptyCard>
							<template v-slot:header>No Faculty</template>
							No faculty has been added to this session.
						</ListEmptyCard>
					</template>
					<section class="br-t_1 br_black-2 br_solid">
						<header
							class="
								flex flex_row
								br_black-2 br_solid
								br-b_1
								justify_center
							"
						>
							<i
								class="
									fas
									fa-grip-vertical
									self_center
									c_black-3
									h:c_primary
									p-y_4
									p-x_3
									br-r_1
									br_solid br_black-2
									flex_none
								"
							></i>
							<h4 class="flex_auto self_center p-l_4 m_0">
								Faculty
							</h4>
							<Btn :state="'empty'" @onClick="faculty = []"
								>remove</Btn
							>
						</header>
						<main
							class="
								p_4
								flex flex_inline flex_wrap
								gap-x_4
								gap-y_3
							"
						>
							<InputText  :required="true"  class="flex_auto w_80" :value="''"
								>Faculty Name</InputText
							>
							<InputText class="flex_auto" :value="''"
								>Personify ID</InputText
							>
							<InputText class="flex_auto" :value="''"
								>Location</InputText
							><div class="flex_auto">
								
							<InputSelect
								v-if="faculty.length > 0"
								
								:value="faculty[0].role"
								@input="faculty[0].role = $event"
								:options="roleOptions"
								>Role
								<template v-slot:hint>
									<Btn
										v-if="faculty[0].role !== 'other'"
										class="self_end z_0"
										@onClick="faculty[0].role = 'other'"
										size="tiny"
										corner="round"
										state="empty"
										>Other</Btn
									>
								</template>
							</InputSelect>
							<InputText :required="true" v-if="faculty.length > 0 && faculty[0].role == 'other'"  :value="''"
								>Other</InputText
							>
							</div>
						</main>
					</section>
				</ListLoader>
				<div
					class="
						flex flex_row
						justify_center
						gap-x_4
						p_4
						br-t_1
						br_solid br_black-3
						br-b_1
					"
				>
					<Btn
						class="flex_auto w_40"
						size="small"
						state="secondary"
						@onClick="removePresentation()"
						>Cancel</Btn
					>
					<Btn class="flex_auto w_40" size="small" state="primary"
						>Save</Btn
					>
				</div>
			</div>
		</ListLoader>
		<!-- placeholder for all input elements I might need for building this -->
		<div class="display_none">
			<InputText />
			<FieldSetGroup />
			<InputTextArea />
		</div>
	</section>
</template>

<script>
import Btn from "../../Origami/src/components/subComponents/Btn.vue";
import InputText from "../../Origami/src/components/BasicForms/Input.Text.vue";
import InputSelect from "../../Origami/src/components/BasicForms/Input.Select.vue";
import InputTextArea from "../../Origami/src/components/BasicForms/Input.TextArea.vue";
import FieldSetGroup from "../../Origami/src/components/BasicForms/FieldSetGroup.vue";
import ListLoader from "../../Origami/src/components/subComponents/ListLoader.vue";
import ListEmptyCard from "../../Origami/src/components/subComponents/ListEmptyCard.vue";
import InputTextAndButton from "../../Origami/src/components/BasicForms/Input.TextAndButton.vue";

export default {
	name: "Presentations",
	props: ["presentationsList"],
	data() {
		return {
			presentations: [],
			faculty: [],
			roleOptions: ["moderator", "presenter", "speaker", "other"]
		};
	},
	components: {
		Btn,
		InputText,
		InputSelect,
		InputTextArea,
		FieldSetGroup,
		ListLoader,
		ListEmptyCard,
		InputTextAndButton,
	},
	methods: {
		newPresentation() {
			this.presentations = [{}];
		},
		attachPresentation() { },
		removePresentation() {
			this.presentations = [];
		},
	},
};
</script>

<style scoped></style>
