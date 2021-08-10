<template>
	<section id="tags">
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
				><i class="far p-r_3 p_1 fa-plus"></i>
				new
			</Btn>
		</div>
		<p class="font-size_down-1 c_black-6">
			These tags apply to only this agenda version of this session.
		</p>
		<ul class="list-group ul_none m-b_5">
			<li
				v-for="tag in tags"
				class="lh_2 p-y_2 br_0 br_solid br_black-2 br-t_1 flex flex_row justify_start"
				:key="'tag_' + tag.id"
			>
				<div class="flex_auto self_center c_primary lh_1 p-y_2">
					<strong class="block">
						{{ tag.label }}
					</strong>
					<span class="opacity_7 font-size_down">{{
						tag.category
					}}</span>
				</div>
				<div
					class="flex_none self_center c_primary h:c_alert-n2 h:bg_alert-4 br_radius"
					@click="onDeleteTag(tag.id)"
				>
					<i class="far fa-times p_3"></i>
				</div>
			</li>
		</ul>
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
	</section>
</template>

<script>
import Modal from "../../Origami/src/components/subComponents/Modal.vue";
import Btn from "../../Origami/src/components/subComponents/Btn.vue";
import NewTag from "../components/NewTagForm.vue";
import { tagsCollection } from "@/firebase";


export default {
    name:'AttachedTags',
	components: {
		Modal,
		NewTag,
		Btn,
	},
	data() {
		return {
			newTagModalVisible: false,
			tags: [],
		};
	},
        mounted() {
		this.getAllTags();
	},

	methods: {
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
	},

};
</script>

<style scoped></style>
