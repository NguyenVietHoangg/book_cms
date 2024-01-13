<template>
	<div id="file-manager" :class="getClass">
		<div class="open-file-manager" data-toggle="modal" data-target="#frameFileManager"
			@click="toggleFileManager(modelId)">
			<i class="fas fa-thin fa-cloud"></i>
		</div>
		<input type="hidden" :value="getFileIds" :id="switchModelId" />
		<DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
			<div class="item-1">
				<div for="file-input" class="label-text-input">
					<span v-if="dropZoneActive">
						<span>Hủy bỏ</span>
					</span>
					<span v-else>
						<span>
							<i class="fas fa-chevron-up" style="transform: rotate(90deg);" aria-hidden="true"></i>
						</span>
						<span v-html="getInputText"></span>
					</span>

					<input v-if="!multiple" type="file" class="file-input" @change="onInputChange" />
					<input v-else type="file" class="file-input" multiple="true" @change="onInputChange" />
				</div>
				<ul class="image-list" v-show="tmpFiles[switchModelId].length">
					<FilePreview v-for="file of tmpFiles[switchModelId]" :key="file.id" :file="file" tag="li"
						@remove="removeFile" @preview="previewFile" />
				</ul>
				<div class="form-group">
					<div v-if="tmpFiles[switchModelId].length" class="upload-btn" @click.prevent="uploadProcess(files)"
						title="Tải lên">
						<i class="fa fa-cloud-upload" aria-hidden="true"></i>
						Tải lên
					</div>
				</div>
			</div>
			<div class="item-1">
				<ul class="image-list current-show" v-show="currentFiles[switchModelId].length">
					<FilePreview v-for="file of currentFiles[switchModelId]" :key="file.id" :file="file" tag="li"
						@remove="removeFileAfterUpload" :checked="'ok'" @preview="previewFile" />
				</ul>
				<div v-if="isChangeUpload" class="upload-btn" @click.prevent="revertProcess()"
					title="Khôi phục file gốc">
					<i class="fa fa-sync" aria-hidden="true"></i> Revert
				</div>
			</div>
		</DropZone>
		<FileManager v-if="showFileManager" @preview="previewFile" @applyFileFromManager="applyFileFromManager"
			:modelId="modelId" :showFileManager="showFileManager" />
	</div>
</template>

<script>
import { defineComponent, ref } from "vue";
import DropZone from './components/DropZone.vue'
import FilePreview from './components/FilePreview.vue'
import FileManager from './components/FileManager.vue'
// File Management
import useFileList from './compositions/file-list'
import createUploader, { getMediaSource } from './compositions/file-uploader'
const obj = useFileList()
// Uploader

export default defineComponent({
	props: {
		modelId: {
			type: String,
			default: 'file_id'
		},
		multiple: {
			type: Boolean,
			default: false
		},
		widthManager: {
			type: String,
			default: '130px'
		},
		textInput: {
			type: String,
			default: ' Click vào đây để thêm File'
		},
		getMediaEndpoint: {
			type: String,
			default: null
		},
		uploadEndpoint: {
			type: String,
			default: null
		},
		fileIds: {
			type: [Array, String],
			default: []
		},
		callbackResult: {
			type: Function,
			default: function ({ids, modelId, multiple}) {
				console.log('please set callbackResult:', {ids, modelId, multiple})
			}
		},
	},
	data() {
		return {
			files: obj.files,
			addFiles: obj.addFiles,
			removeFile: obj.removeFile,
			uploadFiles: createUploader(this.uploadEndpoint),
			tmpFiles: { [this.modelId]: [] },
			currentFiles: { [this.modelId]: [] },
			backupFiles: { [this.modelId]: [] },
			switchModelId: [this.modelId],
			isChangeUpload: false,
			showFileManager: null,
		};
	},
	components: {
		DropZone,
		FilePreview,
		FileManager,
	},
	setup(props) {
	},
	computed: {
		getInputText() {
			return !this.multiple ? ' Click vào đây để thêm File' : ' Click vào đây để thêm Files'
		},
		getClass() {
			return !this.multiple ? 'only-cover' : ''
		},
		getFileIds() {
			return this.fileIds
		}
	},
	methods: {
		onInputChange(e) {
			var me = this
			me.addFiles(e.target.files, this.multiple)
			if (!this.multiple) {
				this.files = [this.files[this.files.length - 1]]
				this.tmpFiles[this.switchModelId] = this.files
			} else {
				this.tmpFiles[this.switchModelId] = this.files
			}
			e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
		},
		async uploadProcess(files) {
			this.isChangeUpload = true
			let newFiles = await this.uploadFiles.uploadFiles(this.files)
			newFiles = newFiles.filter(n => n)
			newFiles = this.convertToObjectFile(newFiles, true)
			if (!this.multiple) {
				this.currentFiles[this.switchModelId] = [newFiles[0]]
			} else {
				this.currentFiles[this.switchModelId] = [...this.currentFiles[this.switchModelId], ...newFiles]
			}
			this.files = []
			this.tmpFiles[this.switchModelId] = []
			this.applyIds()
		},
		revertProcess() {
			this.isChangeUpload = false
			this.files = []
			this.tmpFiles[this.switchModelId] = []
			this.currentFiles[this.switchModelId] = this.Gcf._l.cloneDeep(this.backupFiles[this.switchModelId])
			this.applyIds()
		},
		async applyIds() {
			const ids = this.currentFiles[this.switchModelId].map(item => item.id)
			document.getElementById(this.switchModelId).value = ids
			this.callbackResult({ids, modelId: this.switchModelId, multiple: this.multiple})
		},
		async createBackupFiles() {
			if (this.getFileIds) {
				if (Array.isArray(this.getFileIds)) {
					this.backupFiles[this.switchModelId] = this.getFileIds
				} else {
					this.backupFiles[this.switchModelId] = [this.getFileIds]
				}
			}
			if (!this.backupFiles[this.switchModelId].length) {
				return
			}
			let listFiles = await getMediaSource({ ids: this.backupFiles[this.switchModelId] }, this.getMediaEndpoint)
			if (listFiles && listFiles.rows.length) {
				this.currentFiles[this.switchModelId] = this.convertToObjectFile(listFiles.rows, null)
			}
			this.backupFiles[this.switchModelId] = this.Gcf._l.cloneDeep(this.currentFiles[this.switchModelId])
		},
		applyFileFromManager(list = [], switchModelId) {
			this.switchModelId = switchModelId
			if (!list.length) {
				return
			}
			let newFiles = this.convertToObjectFile(list)
			if (newFiles.length) {
				this.isChangeUpload = true
				if (!this.multiple) {
					this.currentFiles[this.switchModelId] = [newFiles[0]]
				} else {
					this.currentFiles[this.switchModelId] = [...this.currentFiles[this.switchModelId], ...newFiles]
				}
				this.applyIds()
				$('#frameFileManager').modal('hide')
				this.showFileManager = false
			}
		},
		convertToObjectFile(list = [], addStatus = null) {
			if (!list.length) {
				return []
			}
			const res = list.map(item => {
				let itemNew = {
					id: item.id,
					url: item.link,
					file: {
						type: item.mimetype,
						name: item.name,
						mimetype: item.mimetype
					}
				}
				if (addStatus) { // true: success
					itemNew.status = true
				}
				return itemNew
			})
			return res
		},
		removeFileAfterUpload(file) {
			const index = this.currentFiles[this.switchModelId].findIndex(item => item.id == file.id)
			if (index > -1) {
				this.isChangeUpload = true
				this.currentFiles[this.switchModelId].splice(index, 1)
				this.applyIds()
			}
		},
		previewFile(file) {
			navigator.clipboard.writeText(file.url)
			this.Gcf._showAlert({
				position: 'center',
				imageUrl: file.url,
				imageWidth: 600,
				imageAlt: 'Custom image',
				showConfirmButton: true,
				confirmButtonText: 'x',
				icon: 'hide',
				message: 'Link tệp này đã được copy',
				customClass: {
					container: 'container-preview-cover'
				},
				timer: 300000
			})
		},
		toggleFileManager(modelId) {
			this.showFileManager = true
			this.switchModelId = modelId
		}
	},
	async created() {
		var me = this
		setTimeout(function () {
			me.createBackupFiles()
		}, 1)
	}
});
</script>


