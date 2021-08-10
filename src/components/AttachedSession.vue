<template>
	<section class="br_1 br_solid br_black-3 br_radius shadow_overlap-light">
		<header
			class="br-b_1 br_solid br_black-3 p_4 flex flex_row justify_center"
		>
			<InputText
				class="self_stretch w_100 flex_auto"
				v-model="title"
				:state="'disabled'"
			></InputText>
			<Btn class="m-l_3" :size="'small'">Change</Btn>
			<Btn
				@onClick="$emit('onRemove')"
				class="m-l_3"
				:shadow="false"
				:size="'small'"
				:state="'secondary'"
				>Remove</Btn
			>
		</header>
		<div class="flex flex_row:md flex_column">
			<div
				class="
					flex_auto
					w_60:md
					p_4
					p-x_5:lg
					flex_column flex
					gap-y_4
				"
			>
				<InputText v-model="title" :required="true" class="">
					Session Title
					<template v-slot:hint>
						<em class="c_primary-n2 font_bold">Session Titles</em>
						do not need to be the same as agenda titles.
					</template>
				</InputText>
				<InputTextArea class="" :required="true" v-model="description">
					Session Descriptions
					<template v-slot:hint>
						<em class="c_primary-n2 font_bold"
							>Session Descriptions</em
						>
						do not need to be the same as agenda titles.
					</template>
				</InputTextArea>
				<FieldSetGroup id="VideoSource">
					<template v-slot:legend>Video Source</template>
					<InputText
						class="w_100 m-b_4"
						:placeholder="'url or media site PEID'"
						v-model="nothing"
					>
						Live Feed
						<template v-slot:hint>
							<em class="c_primary-n2 font_bold">Live Feed</em>
							can be a url to a webex, zoom, remo, youtube, or
							mediasite peid.
						</template>
					</InputText>
					<InputText class="w_100 m-b_4" v-model="nothing">
						OnDemand (Mediasite PEID)
						<template v-slot:hint>
							<em class="c_primary-n2 font_bold"
								>Mediasite PEID</em
							>
							is an identifier to the mediasite source for this
							session. Contact AV if you are having issues
							tracking down this number.
						</template>
					</InputText>
					<InputText
						class="w_100 m-b_4"
						:postLabel="'min'"
						:type="'number'"
						v-model="zero"
						>Durration</InputText
					>
				</FieldSetGroup>
				<FieldSetGroup id="AttachementSource">
					<template v-slot:legend>Session Attachment</template>
					<FieldSetGroup
						class="w_100"
						v-if="sessionAttachmentVisible"
					>
						<InputText v-model="nothing" class="w_100 m-b_4"
							>File Name</InputText
						>
						<div
							class="
								flex flex_column
								w_100
								bg_primary-5
								br_dashed br_radius br_2 br_primary
								p_4
								m-b_4
								text_center
							"
						>
							<p>
								Either Drag the file into this space or click
								the browse for file button to find the
								attachment.
							</p>
							<span class="m-b_n5 m-t_4"
								><Btn
									class="m-x_5"
									:state="'secondary'"
									:size="'small'"
									>Attach from Library</Btn
								><Btn
									class="m-x_5"
									:state="'primary'"
									:size="'small'"
									>Browse for File</Btn
								></span
							>
						</div>
					</FieldSetGroup>
					<div class="m-t_3">
						<Btn
							@onClick="
								sessionAttachmentVisible =
									!sessionAttachmentVisible
							"
							:corner="'round'"
							:shadow="false"
							:state="'secondary'"
							:size="'tiny'"
							><i class="fa-plus p-r_3 far"></i> New</Btn
						>
					</div>
				</FieldSetGroup>
				<FieldSetGroup id="CreditValues">
					<template v-slot:legend>Avaliable Credits</template>
					<div
						class="
							flex flex_row flex_wrap
							m-t_3
							w_100
							gap-y_3
							gap-x_4
						"
					>
						<InputText
							:type="'number'"
							class="flex_grow w_50 w_40:md max-w_30:md"
							v-for="(credit, index) in credits"
							:key="'credit_' + index"
							:postLabel="creditLabel(credit.type)"
							v-model="credits[index].count"
							@onStateChange="onUpdateCredits()"
						></InputText>
					</div>
				</FieldSetGroup>
			</div>
			<div
				class="
					flex_auto
					w_30:md
					bg_black-2
					shaow_emboss-light
					br-l_1
					br_solid br_black-3
				"
			>
				<Presentations></Presentations>
			</div>
		</div>
	</section>
</template>

<script>
import Btn from "../../Origami/src/components/subComponents/Btn.vue";
import InputText from "../../Origami/src/components/BasicForms/Input.Text.vue";
import InputTextArea from "../../Origami/src/components/BasicForms/Input.TextArea.vue";
import FieldSetGroup from "../../Origami/src/components/BasicForms/FieldSetGroup.vue";
import Presentations from '@/components/AttachedPresentations.vue'
import { creditTypes } from "@/components/CreditTypes.js";

export default {
	name: "AttachedSession",
	components: { Btn, InputText, InputTextArea, FieldSetGroup, Presentations },
	props: {
		session: { type: Object, default: () => { } },
		creditTypes: { type: Array, default: () => { return creditTypes } }
	},
	data() {
		return {
			nothing: "",
			zero: 0,
			sessionAttachmentVisible: true,
			title: null,
			description: null,
			liveURL: null,
			onDemandPEID: null,
			duration: null,
			hasVideoSource: null,
			hasAttachementSource: null,
			attachmentURL: null,
			credits: null,
			sessionTags: null,
			presentations: []
		}
	},
	computed: {

	},
	mounted() {
		let a = this.creditTypes.map((credit) => { return { 'type': credit.type, 'count': 0, 'active':true } });
		this.title = (this.session.title || "");
		this.description = (this.session.description || "");
		this.liveURL = (this.session.liveURL || "");
		this.onDemandPEID = (this.session.onDemandPEID || "");
		this.duration = (this.session.onDemandPEID || "");
		this.hasVideoSource = (this.session.hasVideoSource || false);
		this.hasAttachementSource = (this.session.hasAttachementSource || false);
		this.attachmentURL = (this.session.attachmentURL || "");
		this.credits = a.map(credit => this.creditMatch(credit)).sort((a, b) => { return a.type.localeCompare(b.type) });
		this.sessionTags = (this.session.sessionTags || []);
	},
	methods: {
		newPresentaiton() { },
		attachPresentation() { },
		creditMatch(credit) {
			let index = this.session.credits.map(e => e.type).indexOf(credit.type);
			if (index != -1) {
				credit.count = this.session.credits[index].count;
			}
			return credit;
		},
		creditLabel(type) {
			console.log(this.creditTypes);
			let creditIndex = this.creditTypes.findIndex(c => c.type == type);
			console.log(this.creditTypes[creditIndex].shortName)
			return this.creditTypes[creditIndex].shortName;
		},
		onUpdateCredits() {
			
			
			this.$emit('onUpdateCredits', this.credits)
		},
		onInput() {
			let obj = {
				'title': this.title,
				'description': this.description,
				'liveURL': this.liveURL,
				'onDemandPEID': this.onDemandPEID,
				'duration': this.duration,
				'hasVideoSource': this.hasVideoSource,
				'hasAttachementSource': this.hasAttachementSource,
				'attachmentURL': this.attachmentURL,
				'credits': this.credits,
				'sessionTags': this.sessionTags,

			};
			return obj;
			
		}
	}

}
</script>

<style scoped>
</style>