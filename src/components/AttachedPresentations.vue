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
			<template v-slot:default>
				<section v-if="editmode" id="editmode">
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
							<Btn
								:state="'empty'"
								@onClick="removePresentation()"
								>remove</Btn
							>
						</header>
						<main class="p_4 flex flex_column gap-y_3">
							<InputSelect
								:options="[
									'basic',
									'Q&A',
									'pannel disscussion',
									'abstract',
								]"
								:value="'basic'"
								>Type</InputSelect
							>
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
						<AttachedFaculty />
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
							<Btn
								class="flex_auto w_40"
								size="small"
								state="primary"
								@onClick="editmode = false"
								>Save</Btn
							>
						</div>
					</div>
				</section>
				<section v-if="!editmode" id="listmode" class="overflow_auto h_100">
					<presentationListItem v-for="(presentation,index) in presentationList" :key="'pres_'+index" v-bind="presentation" @onClick="onPresentationClick($event,index)"></presentationListItem>
				</section>
			</template>
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
import AttachedFaculty from "@/components/AttachedFaculty.vue";
import PresentationListItem from "@/components/PresentationListItem.vue";

export default {
	name: "Presentations",
	props: [],
	data() {
		return {
			presentations: [],
			roleOptions: ["moderator", "presenter", "speaker", "other"],
			editmode: true,
			presentationList: [{
				"id": "4242e0e8-f13d-4df1-b4e9-e4b1def85832",
				"sessionId": 128,
				"label": "amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis",
				"duration": 19,
				"attachments": [
					{
						"url": "http://dummyimage.com/209x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/129x100.png/cc0000/ffffff"
					},
					{
						"url": "http://dummyimage.com/108x100.png/dddddd/000000"
					}
				],
				"faculty": [
					{
						"fullname": "Roderick Snoddy"
					},
					{
						"fullname": "Laurianne Leppingwell"
					}
				],
				"mediasitePEID": "20db36d6-5cfb-4d11-88ed-e28d3b90e5ae"
			}, {
				"id": "4d80515d-cb89-4c7f-8947-a28b51fa353a",
				"sessionId": 110,
				"label": "euismod scelerisque quam turpis adipiscing lorem vitae",
				"duration": 28,
				"attachments": [

				],
				"faculty": [
					{
						"fullname": "Caitrin Pfeffer"
					},
					{
						"fullname": "Roxanna Krout"
					},
					{
						"fullname": "Florida Margrem"
					}
				],
				"mediasitePEID": "076deafa-6a76-449d-a526-a49c153e8c62"
			}, {
				"id": "d4d9b7db-e22c-4bfc-afbb-3d17c63b9ed2",
				"sessionId": 143,
				"label": "turpis eget elit sodales scelerisque mauris sit",
				"duration": 19,
				"attachments": [
					{
						"url": "http://dummyimage.com/248x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/128x100.png/ff4444/ffffff"
					},
					{
						"url": "http://dummyimage.com/132x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/159x100.png/5fa2dd/ffffff"
					}
				],
				"faculty": [
					{
						"fullname": "Arvie McQuillan"
					},
					{
						"fullname": "Luke Easson"
					}
				],
				"mediasitePEID": "bd2290db-06f8-488b-81fe-759c0614b54f"
			}, {
				"id": "4ad35528-c90f-448b-bbd4-471cdc3d9494",
				"sessionId": 127,
				"label": "commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel",
				"duration": 10,
				"attachments": [
					{
						"url": "http://dummyimage.com/132x100.png/cc0000/ffffff"
					}
				],
				"faculty": [
					{
						"fullname": "Jourdan Shortin"
					},
					{
						"fullname": "Leandra Graysmark"
					},
					{
						"fullname": "Calla Mordecai"
					},
					{
						"fullname": "Ringo Battelle"
					},
					{
						"fullname": "Elvis Trinder"
					}
				],
				"mediasitePEID": "663dd5a7-fade-4254-b71c-3d56c29b84ae"
			}, {
				"id": "7106dbf8-2e7e-44f4-8e61-95276c038bdb",
				"sessionId": 109,
				"label": "suspendisse ornare consequat lectus in est risus",
				"duration": 16,
				"attachments": [
					{
						"url": "http://dummyimage.com/151x100.png/5fa2dd/ffffff"
					},
					{
						"url": "http://dummyimage.com/102x100.png/dddddd/000000"
					}
				],
				"faculty": [
					{
						"fullname": "Devon Pankettman"
					}
				],
				"mediasitePEID": "40fdd7ee-99f8-4e52-a9e7-aceffaef1c93"
			}, {
				"id": "602ab7a8-6036-4f55-9c68-964b4a729e7d",
				"sessionId": 198,
				"label": "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae",
				"duration": 14,
				"attachments": [

				],
				"faculty": [

				],
				"mediasitePEID": "26f00e40-11f9-4844-9344-5a2cbb7cfb59"
			}, {
				"id": "2a9ad824-7db5-4580-b4f8-dfca9e1f2a6e",
				"sessionId": 106,
				"label": "nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta",
				"duration": 18,
				"attachments": [
					{
						"url": "http://dummyimage.com/156x100.png/ff4444/ffffff"
					},
					{
						"url": "http://dummyimage.com/132x100.png/5fa2dd/ffffff"
					},
					{
						"url": "http://dummyimage.com/141x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/173x100.png/5fa2dd/ffffff"
					}
				],
				"faculty": [
					{
						"fullname": "Bone Keaveny"
					},
					{
						"fullname": "Sasha Myton"
					}
				],
				"mediasitePEID": "559d67e1-4440-47e1-b612-4ef86c55b2d9"
			}, {
				"id": "cbc67f96-004f-4f75-895e-2b8b5af4a108",
				"sessionId": 112,
				"label": "lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta",
				"duration": 7,
				"attachments": [

				],
				"faculty": [

				],
				"mediasitePEID": "3c1e066c-901c-4bf6-bbce-ca88bfaff45c"
			}, {
				"id": "abf77bcf-e37b-440e-b315-9285a9a567f8",
				"sessionId": 185,
				"label": "pretium iaculis diam erat fermentum justo nec condimentum neque sapien",
				"duration": 3,
				"attachments": [
					{
						"url": "http://dummyimage.com/144x100.png/cc0000/ffffff"
					},
					{
						"url": "http://dummyimage.com/145x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/119x100.png/cc0000/ffffff"
					}
				],
				"faculty": [

				],
				"mediasitePEID": "656eb0da-fceb-4c23-8b02-c7b150a381ec"
			}, {
				"id": "a6fa6ac1-37a3-492f-9cf2-b6bc7bcd7026",
				"sessionId": 157,
				"label": "metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque",
				"duration": 22,
				"attachments": [
					{
						"url": "http://dummyimage.com/239x100.png/ff4444/ffffff"
					},
					{
						"url": "http://dummyimage.com/218x100.png/ff4444/ffffff"
					},
					{
						"url": "http://dummyimage.com/186x100.png/dddddd/000000"
					}
				],
				"faculty": [
					{
						"fullname": "Fayette Bladge"
					},
					{
						"fullname": "Ruben Hylden"
					},
					{
						"fullname": "Kellen Flute"
					}
				],
				"mediasitePEID": "78ba52b4-5dd0-4073-9db0-986a69f81226"
			},{
				"id": "4242e0e8-f13d-4df1-b4e9-e4b1def85832",
				"sessionId": 128,
				"label": "amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis",
				"duration": 19,
				"attachments": [
					{
						"url": "http://dummyimage.com/209x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/129x100.png/cc0000/ffffff"
					},
					{
						"url": "http://dummyimage.com/108x100.png/dddddd/000000"
					}
				],
				"faculty": [
					{
						"fullname": "Roderick Snoddy"
					},
					{
						"fullname": "Laurianne Leppingwell"
					}
				],
				"mediasitePEID": "20db36d6-5cfb-4d11-88ed-e28d3b90e5ae"
			}, {
				"id": "4d80515d-cb89-4c7f-8947-a28b51fa353a",
				"sessionId": 110,
				"label": "euismod scelerisque quam turpis adipiscing lorem vitae",
				"duration": 28,
				"attachments": [

				],
				"faculty": [
					{
						"fullname": "Caitrin Pfeffer"
					},
					{
						"fullname": "Roxanna Krout"
					},
					{
						"fullname": "Florida Margrem"
					}
				],
				"mediasitePEID": "076deafa-6a76-449d-a526-a49c153e8c62"
			}, {
				"id": "d4d9b7db-e22c-4bfc-afbb-3d17c63b9ed2",
				"sessionId": 143,
				"label": "turpis eget elit sodales scelerisque mauris sit",
				"duration": 19,
				"attachments": [
					{
						"url": "http://dummyimage.com/248x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/128x100.png/ff4444/ffffff"
					},
					{
						"url": "http://dummyimage.com/132x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/159x100.png/5fa2dd/ffffff"
					}
				],
				"faculty": [
					{
						"fullname": "Arvie McQuillan"
					},
					{
						"fullname": "Luke Easson"
					}
				],
				"mediasitePEID": "bd2290db-06f8-488b-81fe-759c0614b54f"
			}, {
				"id": "4ad35528-c90f-448b-bbd4-471cdc3d9494",
				"sessionId": 127,
				"label": "commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel",
				"duration": 10,
				"attachments": [
					{
						"url": "http://dummyimage.com/132x100.png/cc0000/ffffff"
					}
				],
				"faculty": [
					{
						"fullname": "Jourdan Shortin"
					},
					{
						"fullname": "Leandra Graysmark"
					},
					{
						"fullname": "Calla Mordecai"
					},
					{
						"fullname": "Ringo Battelle"
					},
					{
						"fullname": "Elvis Trinder"
					}
				],
				"mediasitePEID": "663dd5a7-fade-4254-b71c-3d56c29b84ae"
			}, {
				"id": "7106dbf8-2e7e-44f4-8e61-95276c038bdb",
				"sessionId": 109,
				"label": "suspendisse ornare consequat lectus in est risus",
				"duration": 16,
				"attachments": [
					{
						"url": "http://dummyimage.com/151x100.png/5fa2dd/ffffff"
					},
					{
						"url": "http://dummyimage.com/102x100.png/dddddd/000000"
					}
				],
				"faculty": [
					{
						"fullname": "Devon Pankettman"
					}
				],
				"mediasitePEID": "40fdd7ee-99f8-4e52-a9e7-aceffaef1c93"
			}, {
				"id": "602ab7a8-6036-4f55-9c68-964b4a729e7d",
				"sessionId": 198,
				"label": "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae",
				"duration": 14,
				"attachments": [

				],
				"faculty": [

				],
				"mediasitePEID": "26f00e40-11f9-4844-9344-5a2cbb7cfb59"
			}, {
				"id": "2a9ad824-7db5-4580-b4f8-dfca9e1f2a6e",
				"sessionId": 106,
				"label": "nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta",
				"duration": 18,
				"attachments": [
					{
						"url": "http://dummyimage.com/156x100.png/ff4444/ffffff"
					},
					{
						"url": "http://dummyimage.com/132x100.png/5fa2dd/ffffff"
					},
					{
						"url": "http://dummyimage.com/141x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/173x100.png/5fa2dd/ffffff"
					}
				],
				"faculty": [
					{
						"fullname": "Bone Keaveny"
					},
					{
						"fullname": "Sasha Myton"
					}
				],
				"mediasitePEID": "559d67e1-4440-47e1-b612-4ef86c55b2d9"
			}, {
				"id": "cbc67f96-004f-4f75-895e-2b8b5af4a108",
				"sessionId": 112,
				"label": "lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta",
				"duration": 7,
				"attachments": [

				],
				"faculty": [

				],
				"mediasitePEID": "3c1e066c-901c-4bf6-bbce-ca88bfaff45c"
			}, {
				"id": "abf77bcf-e37b-440e-b315-9285a9a567f8",
				"sessionId": 185,
				"label": "pretium iaculis diam erat fermentum justo nec condimentum neque sapien",
				"duration": 3,
				"attachments": [
					{
						"url": "http://dummyimage.com/144x100.png/cc0000/ffffff"
					},
					{
						"url": "http://dummyimage.com/145x100.png/dddddd/000000"
					},
					{
						"url": "http://dummyimage.com/119x100.png/cc0000/ffffff"
					}
				],
				"faculty": [

				],
				"mediasitePEID": "656eb0da-fceb-4c23-8b02-c7b150a381ec"
			}, {
				"id": "a6fa6ac1-37a3-492f-9cf2-b6bc7bcd7026",
				"sessionId": 157,
				"label": "metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque",
				"duration": 22,
				"attachments": [
					{
						"url": "http://dummyimage.com/239x100.png/ff4444/ffffff"
					},
					{
						"url": "http://dummyimage.com/218x100.png/ff4444/ffffff"
					},
					{
						"url": "http://dummyimage.com/186x100.png/dddddd/000000"
					}
				],
				"faculty": [
					{
						"fullname": "Fayette Bladge"
					},
					{
						"fullname": "Ruben Hylden"
					},
					{
						"fullname": "Kellen Flute"
					}
				],
				"mediasitePEID": "78ba52b4-5dd0-4073-9db0-986a69f81226"
			}]


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
		AttachedFaculty,
		PresentationListItem
	},
	methods: {
		newPresentation() {
			this.presentations = [{}];
		},
		attachPresentation() { },
		removePresentation() {
			this.presentations = [];
		},
		onPresentationClick(event, id) {console.log(id+event)}
	},
};
</script>

<style scoped></style>
