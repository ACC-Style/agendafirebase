<template>
	<div class="home flex flex_row font_0 p_4">
		<nav class="p_5 br-r_1 br_black-1 br_solid flex_none max-w_25 font_1">
			<TreeNav v-bind="navData" :toggleOpenByDefault="true" />
		</nav>
		<section class="flex_column flex flex_auto p_5">
			<header class="flex flex_row font_1 m-t_2">
				<BreadCrumb v-bind="navData" />
			</header>
			<section class="flex flex_row:lg flex_column m-b_4 p-b_4">
				<section class="flex_auto">
					<div class="flex flex_row">
						<h1 class="font_5 c_black-9 p-t_4 flex_auto text_left">
							{{ idNumber }}: {{ sessionTitle }}
						</h1>
					</div>
					<div class="">
						<h3>Agenda Data</h3>
						<div class="flex flex_row gap-x_4">
							<InputText
								:inputType="'number'"
								:label="'ID'"
								:value="idNumber"
								>ID</InputText
							>
							<InputText
								:inputType="'text'"
								:label="'ID'"
								:value="sessionTitle"
							>
								<template v-slot:default>
									Session Title
								</template>
								<template v-slot:hint>
									Changing the session title here will on
									change it for this session only in this
									agenda. To gloabaly alter the session title
									alter it in the session data section.
								</template>
							</InputText>
						</div>
						<InputTextArea class="w_100"
							><template v-slot:default>
								Description
							</template></InputTextArea
						>
					</div>
					<div class="m-y_4 p_4 bg_black-3">
						Section with data around the agenda.
					</div>
					<div class="m-y_4 p_4 bg_black-3">
						Type of release and date time requirements.
					</div>
					<div class="m-y_4 p_4 bg_black-3">
						Delay time to on demand.
					</div>
				</section>
				<section
					class="
						flex_auto
						p-l_5
						max-w_20:lg
						flex flex_row flex_column:lg
						font_0
					"
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
									"
								>
									<a href="" class="h:undecorated"
										>Duplicate Agenda Item</a
									>
								</li>
								<li
									class="
										p_2
										br_0 br_solid br_black-2
										br-t_1
										h:bg_primary-5
									"
								>
									<a href="" class="h:undecorated"
										>Move Session</a
									>
								</li>
								<li
									class="
										p_2
										br_0 br_solid br_black-2
										br-t_1
										h:bg_primary-5
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
								Grant Credit Access
							</h3>
							<p class="font-size_down-1 c_black-6">
								Credit types are calculated from the credits
								available from the associated sessions
							</p>
							<ul class="list-group ul_none m-b_5 font-size_up">
								<li
									v-for="(key, value, index) in creditList"
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
										>{{ value }}
										<span class="c_primary font-size_down"
											>({{ key }})</span
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
									><i class="far p-r_3 p_1 fa-plus"></i> new
								</Btn>
							</div>
							<p class="font-size_down-1 c_black-6">
								These tags apply to only this agenda version of
								this session.
							</p>
							<ul class="list-group ul_none m-b_5">
								<li
									class="
										lh_2
										p-y_2
										br_0 br_solid br_black-2
										br-t_1
										flex flex_row
										justify_start
									"
								>
									<div
										class="flex_auto self_center c_primary"
									>
										Session Format:<strong>
											Pathway Collection</strong
										>
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
									>
										<i class="far fa-times p_3"></i>
									</div>
								</li>
								<li
									class="
										lh_2
										p-y_2
										br_0 br_solid br_black-2
										br-t_1
										flex flex_row
										justify_start
									"
								>
									<div
										class="flex_auto self_center c_primary"
									>
										Session Type:<strong>
											Lounge &amp; Learn
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
									>
										<i class="far fa-times p_3"></i>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</section>
			<h3>Attached Session</h3>
			<section
				class="br_1 br_solid br_black-3 br_radius shadow_overlap-light"
			>
				<header
					class="
						br-b_1
						br_solid br_black-3
						p_4
						flex flex_row
						justify_center
					"
				>
					<input
						class="
							br_2
							p-y_2
							br_solid
							flex_auto
							p-l_4
							lh_3
							br_black-2
							w_100
						"
						v-model="title"
					/>
					<Btn class="m-l_3" :size="'small'">Change</Btn>
					<Btn
						class="m-l_3"
						:shadow="false"
						:size="'small'"
						:state="'secondary'"
						>Remove</Btn
					>
				</header>
				<div class="m_4 p_4 bg_black-3">
					Content area for the session data.
				</div>
				<div class="m_4 p_4 bg_black-3">Source Info</div>
				<div class="m_4 p_4 bg_black-3">Credit Values.</div>
			</section>
		</section>
	</div>
</template>

<script>
// @ is an alias to /src
import BreadCrumb from "../../Origami/src/components/Navigation/App.BreadCrumb.vue";
import TreeNav from "../../Origami/src/components/Navigation/App.SideNav.List.vue";
import Btn from "../../Origami/src/components/subComponents/Btn.vue";
import InputText from "../../Origami/src/components/BasicForms/Input.Text.vue";
import InputTextArea from "../../Origami/src/components/BasicForms/Input.TextArea.vue";
import SwitchToggle from "../../Origami/src/components/subComponents/SwitchToggle.vue";
import { sessionListData } from "../../Origami/src/stories/100-ProductUI/AgendaManager/Data/sessionList.js";
import {
	programChart,
	creditList,
} from "../../Origami/src/stories/100-ProductUI/AgendaManager/Data/charts.js";
export default {
	name: "Sessions",
	components: {
		BreadCrumb,
		TreeNav,
		Btn,
		SwitchToggle, InputText, InputTextArea
	},
	props: {
		idNumber: { type: [Number, String], default: 140 },
		title: { type: String, default: "Ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis" },
	},
	data() {
		return {
			sessionTitle: this.title,
			list: sessionListData,
			isSearchVisible: false,
			chartData: programChart,
			creditList: creditList,
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
								nodes: [{
									label: "140",
									type: "session",
									pageID: 1351,
									isActive: true,
								}]
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
		};
	},
};
</script>
