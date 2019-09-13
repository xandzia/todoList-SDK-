<template>
    <div class="item-wrapper">
        <label :for="data.id">
            <v-icon v-if="completeVal" class="color-blue">mdi-check-box-outline</v-icon>
            <v-icon v-else class="color-blue">mdi-checkbox-blank-outline</v-icon>
        </label>
        <input :id="data.id" type="checkbox" @change="completeVal = !completeVal" :checked="completeVal">
        <TodoInput
                :value="data.title"
                :editable="editable"
                @onEnterSave="saveToDo"
        ></TodoInput>
        <div class="btn-group">
            <button @click="onEdit" title="edit" class="btn-icon" v-if="!editable">
                <v-icon class="color-blue">mdi-pencil</v-icon>
            </button>
            <button @click="onSaveToDo" title="save" class="btn-icon" v-else>
                <v-icon class="color-blue">mdi-content-save</v-icon>
            </button>
            <button @click="onDelete" title="delete" class="btn-icon">
                <v-icon class="color-pink">mdi-delete</v-icon>
            </button>
        </div>
    </div>
</template>

<script>
    import TodoInput from './TodoInput.vue';
    import { mapActions } from 'vuex';

    export default {
        name: "TodoItem",
        components: {
            TodoInput
        },
        props: {
            data: {
                type: Object,
                default: (() => {})
            }
        },
        data() {
            return {
                editable: false,
            }
        },
        methods: {
            ...mapActions(['saveChanges', 'deleteItem', 'markComplete']),

            onEdit() {
                this.editable = true
            },
            onDelete() {
                this.deleteItem(this.id)
            },
            saveToDo(val) {
                this.editable = false;
                const id = this.id;
                this.saveChanges({ id, val });
            },
            onSaveToDo() {
                this.$emit('onSaveToDo')
            }
        },
        computed: {
            id() {
                return this.data.id
            },
            completeVal: {
                get() {
                    return this.data.completed
                },
                set(val) {
                    const id = this.id;
                    this.markComplete({ id, val})
                }
            }
        }
    }
</script>

<style lang="scss">
    input[type=checkbox] {
        opacity: 0;
    }
    .item-wrapper {
        display: flex;
        flex-wrap: nowrap;
        padding: 10px 0;
        label {
            .v-icon {
                cursor: pointer;
            }
        }
        .theme--light.v-icon.color-blue {
            color: #283593;
        }
        .theme--light.v-icon.color-pink {
            color: #D81B60;
        }
    }
    .btn-group {
        display: flex;
        flex-wrap: nowrap;
        padding: 0 20px;
        .btn-icon {
            padding: 0 10px;
        }
    }
</style>