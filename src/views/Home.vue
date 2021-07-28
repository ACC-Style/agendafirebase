<template>
	<div class="home flex flex_row font_0 p_4">
		<nav class="p_4 p-l_0 br-r_1 br_black-1 br_solid flex_none max-w_20 font_1">
			<TreeNav v-bind="navData" :toggleOpenByDefault="true" />
		</nav>
		<section class="flex_column flex flex_auto p_5 p-t_4">
			<header class="flex flex_row font_1 m-t_2">
				<BreadCrumb v-bind="navData" />
			</header>
			<main>
				<div class="w_100">
					<div class="flex flex_row">
						<h1 class="font_5 c_black-9 p-t_4 flex_auto text_left">
							All Programs
						</h1>
						<div class="self_center m-l_auto">
							<Btn
								@onClick="onNewObject"
								class="lh_1 p-x_3"
								:state="'secondary'"
								:size="'tiny'"
								:shadow="false"
								:corner="'round'"
								><i class="far p-r_3 p_1 fa-plus"></i> new
							</Btn>
						</div>
					</div>
					<div class="flex flex_row p-y_3 w_100">
						<SearchBar class="w_100" />
					</div>
					<div class="bg_black-2 br_1 br_black-2 br_solid">
						<ListLoader :list="list">
							<template v-slot:listNull
								><div
									class="
										p_4
										bg_black-_05
										br_solid br_black-1 br_1
										font_1
									"
								>
									Pulling in Programs for this Program ...
									<LoadingText
										class="inline font_bold font_1"
									/></div
							></template>
							<template v-slot:listEmpty>
								<article
									class="
										m_4
										p_4
										shadow_2
										br_radius br_solid br_2 br_white-9
										bg_shade-5
										font_ui
									"
								>
									<h1
										class="
											font_regular
											p_3
											font_2
											text_center
											br-b_1
											br_solid br_shade-4
										"
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
							<template v-slot:listLoaded>
								<Program
									v-for="(program, index) in list"
									v-bind="program"
									:key="'Program' + index"
								/>
							</template>
						</ListLoader>
					</div>
				</div>
			</main>
		</section>
	</div>
</template>

<script>
// @ is an alias to /src
import BreadCrumb from "../../Origami/src/components/Navigation/App.BreadCrumb.vue";
import TreeNav from "../../Origami/src/components/Navigation/App.SideNav.List.vue";
import ListLoader from "../../Origami/src/components/subComponents/ListLoader.vue";
import Program from "../../Origami/src/components/AgendaManagement/Agenda.ProgramListItem";
import Btn from "../../Origami/src/components/subComponents/Btn.vue";
import LoadingText from "../../Origami/src/components/subComponents/LoadingText.vue";
import SearchBar from "../../Origami/src/components/BasicForms/Input.SearchBar.vue";
import { programListData } from "../../Origami/src/stories/100-ProductUI/AgendaManager/Data/programList.js";
export default {
	name: "Home",
	components: {
		BreadCrumb,
		TreeNav,
		ListLoader,
		Program,
		Btn,
		LoadingText,
		SearchBar,
	},
	data() {
		return {
			list: programListData.sort((a, b) => {
				return a.label < b.label ? -1 : 1;
			}),
			navData: {
				label: "Home",
				type: "home",
				pageID: -1,
				isActive: true,
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
						label: "Elements Library", type: "headline",
						nodes: [{
							label: "Presentations",
							type: "presentations",
							pageID: 1351,
						},
						{
							label: "Tags",
							type: "tags",
							pageID: 1351,

						},
						{ label: "Attachments", type: "attachments", pageID: 1351 },]
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
					}
				],
			},
		};
	},
};
</script>
