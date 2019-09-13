<template>
    <div class="todo-input" :class="{'focused': focused && editable, 'readOnly': !editable}">
        <input
                type="text"
                :id="inputValue"
                v-model="inputValue"
                @change="onChange"
                @focus="focused = true"
                @blur="focused = false"
                :readonly="!editable"
                @keyup.enter="onEnterSave"
        />
        <label
                for="inputValue"
                v-show="editable && inputValue.length < 1"
        >Input you deal</label>
    </div>
</template>

<script>
    export default {
        name: "TodoInput",
        props: {
            value: {
                type: String,
                default: ''
            },
            editable: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                innerValue: '',
                focused: false
            }
        },
        created() {
            this.$parent.$on('onSaveToDo', () => {
                this.$emit('onEnterSave', this.innerValue)
            })
        },
        methods: {
            onChange() {
                this.$emit('input', this.innerValue)
            },
            onEnterSave() {
                this.$emit('onEnterSave', this.innerValue)
            }
        },
        computed: {
            inputValue: {
                get() {
                    return this.value
                },
                set(val) {
                    this.innerValue = val
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    input {
        display: flex;
        flex: 1 1 auto;
        position: relative;
    }
    label {
        left: 0px;
        right: auto;
        position: absolute;
        height: 20px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.54);
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        top: 6px;
        transform-origin: top left;
        white-space: nowrap;
        pointer-events: none;
        font-size: 16px;
        min-height: 8px;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
    .todo-input {
        align-items: center;
        display: flex;
        margin-bottom: 8px;
        min-height: 32px;
        position: relative;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        width: 100%;
        cursor: text;
        &:before {
            bottom: -1px;
            content: "";
            left: 0;
            position: absolute;
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            width: 100%;
            border-color: rgba(0, 0, 0, 0.42);
            border-style: solid;
            border-width: thin 0 0 0;
        }
        &::after {
            border-color: currentColor;
            border-style: solid;
            border-width: thin 0 thin 0;
            transform: scaleX(0);
            bottom: -1px;
            content: "";
            left: 0;
            position: absolute;
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            width: 100%;
        }
    }
    .focused {
        &:after {
            transform: scaleX(1);
            border-color: #283593;
        }
        input:focus + label {
            transform: translateY(-18px) scale(0.75);
            color: #283593;
        }
    }
    .readOnly {
        &:before,
        &:after {
            content: none;
        }
    }
</style>