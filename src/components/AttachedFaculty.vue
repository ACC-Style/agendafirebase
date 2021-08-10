<template>
    <section>
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
						@onClick="attachFacultyModalVisible = true"
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
				<Modal 
				v-if="attachFacultyModalVisible"
				@onClose="attachFacultyModalVisible = false"
				>
				<template v-slot:header>
					Attach Faculty
				</template>
				<template>
					<SearchBar :placeholder="'Search for Faculty by Name, PID, or email'" :value="''" @onSearch="facultySearchResults=[]"/>
					<ListLoader :list="facultySearchResults">
					<template v-slot:listNull>
						<ListEmptyCard :icon="false">
							<template v-slot:header>Search For Faculty</template>
							Search by name or PID or email.
						</ListEmptyCard>
					</template>
					<template v-slot:listEmpty>
						<ListEmptyCard class="bg_warning-4">
							<template v-slot:header>No Faculty</template>
							No faculty have been found with your search result check spelling.
						</ListEmptyCard>
					</template>
					</ListLoader>
				</template>
				<template v-slot:footer>
					<div
					class="
						flex flex_row
						
						gap-x_4
						w_100 justify_end
					"
				>
					<Btn
						class="flex_auto w_40"
						size="small"
						state="secondary"
						@onClick="attachFacultyModalVisible = false"
						>Cancel</Btn
					>
					<Btn class="flex_auto w_40" size="small" state="primary" @onClick="attachFacultyModalVisible = false"
						>Save</Btn
					>
				</div>
				</template>
				</Modal>
    </section>
</template>

<script>
import Btn from "../../Origami/src/components/subComponents/Btn.vue";
import InputText from "../../Origami/src/components/BasicForms/Input.Text.vue";
import InputSelect from "../../Origami/src/components/BasicForms/Input.Select.vue";
import SearchBar from "../../Origami/src/components/BasicForms/Input.SearchBar.vue";
import ListLoader from "../../Origami/src/components/subComponents/ListLoader.vue";
import ListEmptyCard from "../../Origami/src/components/subComponents/ListEmptyCard.vue";
import Modal from "../../Origami/src/components/subComponents/Modal.vue";

    export default {
        components:{ListLoader,ListEmptyCard,InputText,InputSelect,Btn,Modal,SearchBar},
		data() {
			return {
			attachFacultyModalVisible: false,
			faculty: [],
			facultySearchResults:null,
			}
		},
		methods: {
			attachFaculty() {},
			removeFaculty() {},
			newFaculty() {},
		}
    }
</script>

<style scoped>

</style>