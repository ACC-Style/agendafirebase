<template>
	<div class="home flex flex_row font_0 p_4">
		<nav class="p_4 p-l_0 br-r_1 br_black-1 br_solid flex_none max-w_20 font_1">
			<TreeNav v-bind="navData" :toggleOpenByDefault="true" />
		</nav>
		<section class="flex_column flex flex_auto p_5 p-t_4">
			<header class="flex flex_row font_1 m-t_2">
				<BreadCrumb v-bind="navData" />
			</header>
			<main class="flex flex_row:lg flex_column">
				<section class="flex_auto">
					<div class="flex flex_row">
						<h1 class="font_5 c_black-9 p-t_4 flex_auto text_left">
							{{ title }}
						</h1>
					</div>
					<div class="flex flex_row gap-x_3">
						<h3 class="font_3 c_black-9 flex_auto">All Sessions</h3>
						<div
							class="flex flex_auto max-w_15 font_n2 self_center"
						>
							<span class="font_bold self_center">Status:</span>
							<select
								class="lh_1 font_n2 p_2 p-y_0 font_n1 m-l_3"
							>
								<option label="all" />
								<option label="completed" />
								<option label="alert" />
								<option label="warning" />
							</select>
						</div>
						<div
							class="flex flex_auto max-w_15 font_n2 self_center"
						>
							<span class="font_bold self_center">Sort:</span
							><select
								class="lh_1 font_n2 p_2 p-y_0 font_n1 m-l_3"
							>
								<option label="all" />
							</select>
						</div>
						<div
							class="flex flex_shrink max-w_15 font_n2 self_center"
						>
							<Btn
								class="lh_1 p-x_3 h:bg_primary h:c_white"
								:state="'none'"
								:size="'tiny'"
								:shadow="false"
								:corner="'round'"
								@onClick="isSearchVisible = !isSearchVisible"
								><i class="far p-r_3 p_1 fa-search"></i> Search
							</Btn>
						</div>
						<div class="self_center">
							<Btn
								class="lh_1 p-x_3"
								:state="'secondary'"
								:size="'tiny'"
								:shadow="false"
								:corner="'round'"
								><i class="far p-r_3 p_1 fa-plus"></i> new
								sessions
							</Btn>
						</div>
					</div>
					<div
						class="flex flex_row p-y_3 w_100"
						v-if="isSearchVisible"
					>
						<SearchBar class="w_100" />
					</div>
					<div class="bg_black-2 br_1 br_black-2 br_solid">
						<ListLoader :list="list">
							<template v-slot:listNull
								><div
									class="p_4 bg_black-_05 br_solid br_black-1 br_1 font_1"
								>
									Pulling in Programs for this Program ...
									<LoadingText
										class="inline font_bold font_1"
									/></div
							></template>
							<template v-slot:listEmpty>
								<article
									class="m_4 p_4 shadow_2 br_radius br_solid br_2 br_white-9 bg_shade-5 font_ui"
								>
									<h1
										class="font_regular p_3 font_2 text_center br-b_1 br_solid br_shade-4"
									>
										<i
											class="far fa-exclamation-triangle"
										></i>
										You have no Programs
										<i
											class="far fa-exclamation-triangle"
										></i>
									</h1>
									<p class="font_0 p-y_3 lh_3 text_center">
										You need to have at least one Program to
										put sessions into. Click the Add Program
										Button or the new button to add your
										first Program to this program.
									</p>
									<div class="text_center">
										<Btn>Add Program</Btn>
									</div>
								</article>
							</template>
							<template v-slot:default>
								<Session
									v-for="(session, index) in list"
									v-bind="session"
									:key="'session_' + index"
								/>
							</template>
						</ListLoader>
					</div>
				</section>
				<section
					class="flex_auto p-l_5 max-w_20:lg flex flex_row flex_column:lg font_0"
				>
					<div class="max-w_20 font_0">
						<div>
							<h3 class="font_display font-size_up-2">
								Overview
							</h3>
							<StateChart
								:chartData="chartData"
								:allLabel="'all sessions'"
								:allColor="'black'"
								class="m-b_5"
							/>
						</div>
						<div class="">
							<h3 class="font_display font-size_up-2">Actions</h3>
							<ul
								class="ul_none list-group m-b_5 br_1 br_solid br_black-2 br_radius"
							>
								<li
									class="p_2 br_0 br_solid br_black-2 br-t_1 h:bg_primary-5"
								>
									<a href="" class="h:undecorated"
										>Duplicate Channel</a
									>
								</li>
								<li
									class="p_2 br_0 br_solid br_black-2 br-t_1 h:bg_primary-5"
								>
									<a href="" class="h:undecorated"
										>Export Data</a
									>
								</li>
								<li
									class="p_2 br_0 br_solid br_black-2 br-t_1 h:bg_primary-5"
								>
									<a href="" class="h:undecorated"
										>Copy API</a
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
									class="lh_2 p-y_2 flex flex_row justify_start"
								>
									<SwitchToggle
										:size="'tiny'"
										:corner="'round'"
										:isActive="true"
										:activeState="'primary'"
										:notActiveState="'secondary'"
										>Scheduled</SwitchToggle
									>
								</li>
								<li
									class="lh_2 p-y_2 flex flex_row justify_start"
								>
									<SwitchToggle
										:size="'tiny'"
										:corner="'round'"
										:isActive="false"
										:activeState="'primary'"
										:notActiveState="'secondary'"
										>Simultaneously</SwitchToggle
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
									class="lh_2 p-y_2 br_0 br_solid br_black-2 flex flex_row justify_start"
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
							<div class="flex flex_row justify_center"><h3 class="font_display font-size_up-2">
								<i class="far fa-tags p-r_3"></i>Channel Tags 
							</h3>
                            <Btn
								class="lh_1 p-x_3 m-l_auto self_center"
								:state="'secondary'"
								:size="'tiny'"
								:shadow="false"
								:corner="'round'"
								><i class="far p-r_3 p_1 fa-plus"></i> new
							</Btn></div>
							<p class="font-size_down-1 c_black-6">
								All sessions in this channel will be tagged with these tags.            
							</p>
							<ul class="list-group ul_none m-b_5">
								<li
									
									class="lh_2 p-y_2 br_0 br_solid br_black-2 br-t_1 flex flex_row justify_start"
								>
                                    <div class="flex_auto self_center c_primary">Session Format:<strong> Pathway Collection</strong></div>
                                    <div class="flex_none self_center c_primary h:c_alert-n2 h:bg_alert-4 br_radius"><i class="far fa-times p_3"></i></div>
								</li>
                                <li
									class="lh_2 p-y_2 br_0 br_solid br_black-2 br-t_1 flex flex_row justify_start"
								>
                                    <div class="flex_auto self_center c_primary">Session Type:<strong> Lounge &amp; Learn </strong></div>
                                    <div class="flex_none self_center c_primary h:c_alert-n2 h:bg_alert-4 br_radius"><i class="far fa-times p_3"></i></div>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</main>
		</section>
	</div>
</template>

<script>
// @ is an alias to /src
import BreadCrumb from "../../Origami/src/components/Navigation/App.BreadCrumb.vue";
import TreeNav from "../../Origami/src/components/Navigation/App.SideNav.List.vue";
import ListLoader from "../../Origami/src/components/subComponents/ListLoader.vue";
import Session from "../../Origami/src/components/AgendaManagement/Agenda.SessionListItem";
import Btn from "../../Origami/src/components/subComponents/Btn.vue";
import LoadingText from "../../Origami/src/components/subComponents/LoadingText.vue";
import SearchBar from "../../Origami/src/components/BasicForms/Input.SearchBar.vue";
import StateChart from "../../Origami/src/components/AgendaManagement/SubComponents/Agenda.StateChart.vue";
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
		ListLoader,
		Session,
		Btn,
		LoadingText,
		SearchBar,
		StateChart,
		SwitchToggle,
	},
	props: {
		title: { type: String, default: "Featured Sessions" },
	},
	data() {
		return {
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
                                isActive: true,
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
