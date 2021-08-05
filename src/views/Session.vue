<template>
	<div class="home flex flex_row font_0 p_4">
		<nav
			class="
				p_4
				p-l_0
				br-r_1
				br_black-1 br_solid
				flex_none
				max-w_20
				font_1
			"
		>
			<TreeNav v-bind="navData" :toggleOpenByDefault="true" />
		</nav>
		<section class="flex_column flex flex_auto p_5 p-t_4">
			<header class="flex flex_row font_1 m-t_2">
				<BreadCrumb v-bind="navData" />
			</header>
			<section class="flex flex_row:lg flex_column m-b_4 p-b_4">
				<section class="flex_auto w_50">
					<div class="flex flex_row">
						<h1 class="font_5 c_black-9 p-t_4 flex_auto text_left">
							{{ agenda.id }}: {{ agenda.title }}
						</h1>
					</div>
					<form id="AgendaData" class="">
						<h3 class="font_display font_4 c_primary-n2">
							Agenda Data
						</h3>
						<div class="flex flex_row flex_wrap gap-y_4 gap-x_4">
							<InputText
								class="flex_auto w_5"
								:type="'number'"
								v-model.number="agenda.id"
								:required="true"
								>ID</InputText
							>
							<InputText
								v-model="agenda.title"
								:required="true"
								class="flex_auto w_60"
							>
								Agenda Title
								<!-- <template v-slot:hint>
									Changing the Agenda title here will not change the title of the attached session. To gloabaly alter the Agenda and Session title
									alter it in the session data section.
								</template> -->
							</InputText>
							<InputTextArea
								class="w_100 flex_none"
								:required="true"
								v-model="agenda.description"
								><template v-slot:default>
									Description
								</template></InputTextArea
							>
							<field-set-group class="w_100">
								<template v-slot:legend>Timing</template>
								<div
									class="
										flex flex_row
										gap-x_4
										gap-y_4
										flex_wrap
									"
								>
									<input-text
										v-model="agenda.startDate"
										:type="'date'"
										>Date</input-text
									>
									<input-text
										v-model="agenda.startTime"
										:type="'time'"
										>Start Time</input-text
									>
									<input-text
										icon="fa-stopwatch"
										postLabel="min"
										v-model.number="agenda.duration"
										:type="'number'"
										>Duration</input-text
									>
									<InputRadioButtons
										class="flex_auto"
										v-model="agenda.releaseToOnDemand"
										>Release to On Demand
										<template v-slot:legend
											>Select One</template
										>
									</InputRadioButtons>
									<InputCheckBoxes
										v-if="false"
										class="flex_auto"
										v-model="
											agenda.releaseToOnDemandCheckmarks
										"
										>Release to On Demand
										<template v-slot:legend
											>Select All That Apply</template
										>
									</InputCheckBoxes>
								</div>
							</field-set-group>
						</div>
					</form>
				</section>
				<aside
					class="
						flex_auto
						w_30
						p-l_5
						max-w_20:lg
						flex flex_row flex_column:lg
						font_0
					"
				>
					<Btn class="m-b_4" size="medium" @onClick="saveAgenda()"
						>Save Agenda</Btn
					>
					<div class="max-w_20 font_0">
						<div class="">
							<h3 class="font_display font-size_up-2">Actions</h3>
							<ul
								class="
									ul_none
									list-group
									m-b_5
									br_1 br_solid br_black-2 br_radius
								"
							>
								<li
									class="
										p_2
										br_0 br_solid br_black-2
										br-t_1
										h:bg_primary-5
										p-x_3
									"
								>
									<a href="" class="h:undecorated"
										>Duplicate</a
									>
								</li>
								<li
									class="
										p_2
										br_0 br_solid br_black-2
										br-t_1
										h:bg_primary-5
										p-x_3
									"
								>
									<a href="" class="h:undecorated">Move</a>
								</li>
								<li
									class="
										p_2
										br_0 br_solid br_black-2
										br-t_1
										h:bg_primary-5
										p-x_3
									"
								>
									<a href="" class="h:undecorated"
										>Export Data</a
									>
								</li>
							</ul>
						</div>
						<div>
							<h3 class="font_display font-size_up-2">
								Release Mode
							</h3>
							<p class="font-size_down-1 c_black-6">
								how are the sessions release? Are they all at
								once or are they scheduled at different times.
							</p>
							<ul class="ul_none m-b_5 font-size_up">
								<li
									class="
										lh_2
										p-y_2
										flex flex_row
										justify_start
									"
								>
									<SwitchToggle
										:size="'tiny'"
										:corner="'round'"
										v-bind:value="scheduledRelease"
										@input="toggleScheduledRelease($event)"
										:activeState="'primary'"
										:notActiveState="'secondary'"
										>Scheduled</SwitchToggle
									>
								</li>
								<li
									class="
										lh_2
										p-y_2
										flex flex_row
										justify_start
									"
								>
									<SwitchToggle
										:size="'tiny'"
										:corner="'round'"
										v-bind:value="!scheduledRelease"
										@input="toggleScheduledRelease(!$event)"
										:activeState="'primary'"
										:notActiveState="'secondary'"
										>Unscheduled</SwitchToggle
									>
								</li>
							</ul>
						</div>
						<div>
							<h3 class="font_display font-size_up-2">
								Grant Credit Access
							</h3>
							<p class="font-size_down-1 c_black-6">
								Credit types are calculated from the credits
								available from the associated sessions
							</p>
							<ul class="list-group ul_none m-b_5 font-size_up">
								<li
									v-for="(credit, index) in agenda.credits"
									:key="'c_' + index"
									class="
										lh_2
										p-y_2
										br_0 br_solid br_black-2
										flex flex_row
										justify_start
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
										v-model="creditsActive[credit.type]"
										@input="
											creditsActiveUpdate(
												credit.type,
												index,
												$event
											)
										"
										><span
											v-html="creditLabel(credit.type)"
										>
										</span>
										<span
											v-if="credit.type != 'COP'"
											class="c_primary font-size_down"
											>({{ creditType.count }})</span
										></SwitchToggle
									>
								</li>
							</ul>
						</div>
						<div>
							<div class="flex flex_row justify_center">
								<h3 class="font_display font-size_up-2">
									<i class="far fa-tags p-r_3"></i>Agenda Tags
								</h3>
								<Btn
									class="lh_1 p-x_3 m-l_auto self_center"
									:state="'secondary'"
									:size="'tiny'"
									:shadow="false"
									:corner="'round'"
									@onClick="newTagModalVisible = true"
									><i class="far p-r_3 p_1 fa-plus"></i> new
								</Btn>
							</div>
							<p class="font-size_down-1 c_black-6">
								These tags apply to only this agenda version of
								this session.
							</p>
							<ul class="list-group ul_none m-b_5">
								<li
									v-for="tag in tags"
									class="
										lh_2
										p-y_2
										br_0 br_solid br_black-2
										br-t_1
										flex flex_row
										justify_start
									"
									:key="'tag_' + tag.id"
								>
									<div
										class="flex_auto self_center c_primary"
									>
										{{ tag.category }}:
										<strong>
											{{ tag.label }}
										</strong>
									</div>
									<div
										class="
											flex_none
											self_center
											c_primary
											h:c_alert-n2
											h:bg_alert-4
											br_radius
										"
										@click="onDeleteTag(tag.id)"
									>
										<i class="far fa-times p_3"></i>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</aside>
			</section>
			<header class="flex flex_row">
				<div class="flex_auto w_60"><h3 class="font_display font_4 c_primary-n2 ">Attached Session</h3></div>
				<div class="flex_auto w_30
						p-l_5
						max-w_20:lg"><Btn v-if="attachedSession.length>0" class="m-b_4 w_100" size="medium" @onClick="saveSession()"
						>Save Session</Btn
					></div>
				
								</header>
			
			<ListLoader :list="attachedSession">
					<template v-slot:listEmpty>
						<ListEmptyCard>
							<template v-slot:header><span class="c_alert m-x_3 font_bold">Missing Source: No Session Attached</span></template>
							You must have an attached session to complete an agenda item.
							<template v-slot:footer><div class="flex flex_inline gap-x_3"><Btn :state="'secondary'" class="flex_auto" @onClick="newSession()"><i class="far p-r_3 p_1 fa-plus"></i> New Session</Btn><Btn :state="'primary'" class="flex_auto"><i class="far p-r_3 p_1 fa-paperclip"></i>Attach Session</Btn></div></template>
						</ListEmptyCard>
					</template>
					<AttachedSession @onRemove="attachedSession=[]" :session="sessionData" v-for="(sessionData, index) in attachedSession" :key="'session_'+ index"/>
			</ListLoader>
		
		</section>
		<Modal v-if="newTagModalVisible" @onClose="newTagModalVisible = false">
			<template v-slot:header><h1>Add Program</h1></template>
			<NewTag @onClose="newTagModalVisible = false" ref="newTag" />
			<template v-slot:footer>
				<Btn @onClick="onSubmitTag()">Submit</Btn>
				<Btn @onClick="newTagModalVisible = false" state="secondary"
					>Cancel</Btn
				>
			</template>
		</Modal>
	</div>
</template>

<script>
// @ is an alias to /src
import BreadCrumb from "../../Origami/src/components/Navigation/App.BreadCrumb.vue";
import TreeNav from "../../Origami/src/components/Navigation/App.SideNav.List.vue";
import Btn from "../../Origami/src/components/subComponents/Btn.vue";
import InputText from "../../Origami/src/components/BasicForms/Input.Text.vue";
import InputTextArea from "../../Origami/src/components/BasicForms/Input.TextArea.vue";
import InputRadioButtons from "../../Origami/src/components/BasicForms/Input.RadioButtons.vue";
import InputCheckBoxes from "../../Origami/src/components/BasicForms/Input.Checkboxes.vue";
import FieldSetGroup from "../../Origami/src/components/BasicForms/FieldSetGroup.vue";
import SwitchToggle from "../../Origami/src/components/subComponents/SwitchToggle.vue";
import AttachedSession from "@/components/AttachedSession.vue";
import ListLoader from "../../Origami/src/components/subComponents/ListLoader.vue";
import ListEmptyCard from "../../Origami/src/components/subComponents/ListEmptyCard.vue";
import { creditTypes } from "@/components/CreditTypes.js";
import {
	agendasCollection,
	updateAgenda,
	tagsCollection,
} from "@/firebase";
import Modal from "../../Origami/src/components/subComponents/Modal.vue";
import NewTag from "@/components/NewTagForm.vue";
import moment from "moment";

export default {
	name: "Sessions",
	components: {
		BreadCrumb,ListLoader,
		TreeNav,
		Btn,
		SwitchToggle,
		InputText,
		InputTextArea,
		FieldSetGroup,
		InputRadioButtons,
		InputCheckBoxes,
		Modal,
		NewTag,
		AttachedSession,
		ListEmptyCard
	},
	props: {
		id: { type: [Number, String], default: "0" },
	},
	data() {
		return {

			documentID: this.id,
			attachedSession: [],
			emptySession:[{ title:'', description:''}],
			agenda: {
				id: 0,
				title: '',
				description: '',
				startTime: "",
				endTime: "",
				duration: "5",
				releaseToOnDemand: [
					{ label: "after completion", selected: false },
					{ label: "next day", selected: false },
					{ label: "after program completion", selected: false },
					{ label: "never", selected: true },
				],
				credits: [],
				scheduledRelease: true,
			},
			scheduledRelease: true,
			creditTypes: creditTypes,
			creditsActive: {},
			newTagModalVisible: false,
			navData: {
				label: "Home",
				type: "home",
				pageID: -1,

				nodes: [
					{
						label: "Programs & Channels",
						type: "headline",
						pageID: 1351,
					},
					{
						label: "All Programs",
						type: "program",

						pageID: 1351,
					},
					{
						label: "Recently Modified",
						type: "sub-headline",
					},
					{
						label: "ACC 2021",
						type: "program",
						pageID: 1351,
						nodes: [
							{
								label: "Featured Sessions",
								type: "collection",
								pageID: 1351,
								nodes: [
									{
										label: "140",
										type: "session",
										pageID: 1351,
										isActive: true,
									},
								],
							},
							{
								label: "Pathway Collections",
								type: "collection",
								pageID: 1351,
							},
						],
					},
					{
						label: "Athletic Heart 2021",
						type: "program",
						pageID: 2500,
						nodes: [
							{
								label: "Featured Sessions",
								type: "collection",
								pageID: 2510,
							},
							{
								label: "Pathway Collections",
								type: "collection",
								pageID: 251,
							},
						],
					},
					{ label: "New Program", type: "new", pageID: 1351 },
					{
						label: "Sessions",
						type: "headline",
						pageID: 1351,
						nodes: [
							{
								label: "Recently Modified",
								type: "sub-headline",
							},
							{
								label: "Bungul fuga illo odio.",
								type: "session",
								pageID: 1351,
							},
							{
								label:
									"Atque molestias repellendus vel sit perspiciatis modi.",
								type: "session",
								pageID: 2500,
							},
						],
					},
					{ label: "New Session", type: "new" },
					{
						label: "Elements Library",
						type: "headline",
						nodes: [
							{
								label: "Presentations",
								type: "presentations",
								pageID: 1351,
							},
							{
								label: "Tags",
								type: "tags",
								pageID: 1351,
							},
							{
								label: "Attachments",
								type: "attachments",
								pageID: 1351,
							},
						],
					},

					{
						label: "Users",
						type: "headline",
						pageID: 1351,
						nodes: [
							{
								label: "Faculty & Authors",
								type: "user",
								pageID: 1351,
							},
							{ label: "Admins", type: "admin", pageID: 1351 },
						],
					},
				],
			},
			emailList: [
				{
					id: "9fea071d-c9e1-4587-92f8-e7cc38db9713",
					fullName: "Rozella Padilla",
					email: "rpadilla0@unc.edu",
					showEdit: false,
					showRemove: true,
				},
				{
					id: "7db7915e-a613-4fd6-bdde-a3ca44ecc2ec",
					fullName: "Miguelita Brasener",
					email: "mbrasener1@lulu.com",
					showEdit: false,
					showRemove: true,
				},
				{
					id: "05167f41-015a-4fd6-b34f-0de742e9561d",
					fullName: "Clerissa Pollendine",
					email: "cpollendine2@instagram.com",
					showEdit: false,
					showRemove: true,
				},
				{
					id: "185f7f84-8391-448e-95b4-2eaa3e197ad9",
					fullName: "Celestine Singers",
					email: "csingers3@diigo.com",
					showEdit: false,
					showRemove: true,
				},
				{
					id: "f9fc195b-399e-4c0c-9083-617c985707d1",
					fullName: "Bourke Juan",
					email: "bjuan4@vistaprint.com",
					showEdit: false,
					showRemove: true,
				},
				{
					id: "6b022517-d451-42a6-b63d-57e84a63cef7",
					fullName: "Freddie Bootherstone",
					email: "fbootherstone5@unicef.org",
					showEdit: false,
					showRemove: true,
				},
			],
			tags: [],
		};
	},
	methods: {
		async onCreate() {
			const { id } = await agendasCollection.add(this.agenda);
			this.documentID = id;
		},
		async getAgenda(id) {
			// agendasCollection
			let docRef = agendasCollection.doc(id);

			docRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						console.log("Document data:", doc.data());
						this.agenda = doc.data();
						if (id == "0") {
							this.setDefaultValues();
						}
					} else {
						// doc.data() will be undefined in this case
						console.log("No such document!");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		},
		dateStringFormated(date) {
			return moment(date).format("YYYY-MM-DD");
		},
		setDefaultValues() {
			let date = new Date(2021, 0, 1, 0, 0, 0, 0);
			this.agenda["startDate"] = moment(date).format("YYYY-MM-DD");
			this.agenda["endDate"] = moment(date).format("YYYY-MM-DD");
			this.agenda["startTime"] = moment(date).format("HH:mm");
			this.agenda["duration"] = 0;
			this.agenda["id"] = 0;
			this.agenda["title"] = "New Agenda";
			this.agenda["credits"] = [{ type: "COP", count: 1 }];
			this.agenda["scheduledRelease"] = false;
			this.creditsActiveUpdate("COP", 1, false);
		},
		async onUpdate() {
			await updateAgenda(this.documentID, this.agenda);
		},
		creditLabel(type) {
			return type;
		},
		saveAgenda() {
			if (this.documentID == "0") {
				this.onCreate();
			} else {
				this.onUpdate();
			}
		},
		toggleScheduledRelease(event) {
			console.log(event);
			this.scheduledRelease = event;
			this.agenda.scheduledRelease = event;
		},
		creditsActiveUpdate(type, index, event) {
			this.creditsActive[type] = event;
			this.agenda.credits[index].active = event;
		},
		async getAllTags() {
			try {
				const { docs } = await tagsCollection.get();

				this.tags = docs.map((doc) => {
					const { id } = doc;
					const data = doc.data();
					console.log(data);
					return { id, ...data };
				});

				console.log("loaded Tag list");
			} catch (error) {
				throw new Error("Something gone wrong with tags!" + error);
			}
		},
		onSubmitTag() {
			console.log("trying to add a tag");
			this.$refs.newTag.onSubmit();
			this.getAllTags();
		},
		onDeleteTag(id) {
			console.log(id + "trying to delete tag");
			tagsCollection.doc(id).delete();
			this.getAllTags();
		},
		newSession(){
				this.emptySession[0]['title'] = this.agenda.title;
				this.emptySession[0]['description'] = this.agenda.description;
				this.emptySession[0]['credits'] = this.agenda.credits;
				this.attachedSession = this.emptySession
			}
	},
	mounted() {
		this.getAgenda(this.documentID);
		// this.tags = getAllTags().then( function(val) {
		// 	return val;
		// }) ;
		this.getAllTags();
	},
};
</script>
