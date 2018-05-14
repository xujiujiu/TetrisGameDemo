/**
 * Created by l02122 on 2016/7/27.
 */
var searchBox = Vue.extend({
    props: {
        placeholder: {
            type: String,
            default: "请输入关键字"
        }
    },
    data: function () {
        return {
            keyword: ""
        }
    },
    template: '<div class="input_search">' +
    '<input type="text" v-model="keyword" @keyup.enter.stop.prevent="treeSearch(keyword)" :placeholder="placeholder"/>' +
    '<a @click.stop.prevent="treeSearch(keyword)" class="button_func_icon search"></a>' +
    '</div>',
    methods: {
        treeSearch: function (keyword) {
            this.$dispatch('search-event', keyword)
        }
    }
});

var alarmTreeTemplate = Vue.extend({
    props: {
        showsearch:{
            type:Boolean,
            default:true
        },
        treeid: {
            type: String,
            default: "tree",
            required: true
        },
        style: {
            default: ""
        },
        placeholder: {
            type: String,
            default: "请输入关键字"
        }
    },
    data: function () {
        return {
            keyword: ""
        }
    },
    template: '<div class="section_content alarm_left_content" :style="style">' +
    '<div v-show="showsearch" is="vue-tree-search-box" :placeholder="placeholder" @search-event="searchEvent"></div>' +
    '<div class="alarm_tree_content"><ul :id="treeid" class="ztree"></ul></div>' +
    '</div>',
    methods:{
        searchEvent: function (keyword) {
            this.$dispatch('search-event', keyword,this.treeid)
        }
    },
    components: {
        'vue-tree-search-box': searchBox
    }
});

var alarmSubTreeTemplate = Vue.extend({
    props: {
        treeid: {
            type: String,
            default: "tree",
            required: true
        },
        style: {
            default: ""
        },
        placeholder: {
            type: String,
            default: "请输入关键字"
        },
        classname: {
            type: String,
            default: ""
        }
    },
    data: function () {
        return {
            keyword: ""
        }
    },
    template: '<div :class="classname" :style="style">' +
    '<div is="vue-tree-search-box" :placeholder="placeholder" @search-event="searchEvent"></div>' +
    '<div class="alarm_tree_content"><ul :id="treeid" class="ztree"></ul></div>' +
    '</div>',
    methods: {
        searchEvent: function (keyword) {
            this.$dispatch('search-event', keyword, this.treeid)
        }
    },
    components: {
        'vue-tree-search-box': searchBox
    }
});

var customOrgTreeTemplate = Vue.extend({
    props: {
        channelOptions: {
            type: Object,
            required: true
        },
        treeid: {
            type: String,
            default: "tree",
            required: true
        },
        treetitle: {
            type: String,
            default: "treeTitle"
        },
        placeholder: {
            type: String,
            default: "请输入关键字"
        }
    },
    data: function () {
        return {
            channelType: -1  //所有通道
        }
    },
    template: '<div class="section_header">{{treetitle}}</div>' +
        '<div class="section_content section_content_full">' +
        '<select v-model="channelType" @change="changeChannelType"><option v-for="(key,value) in channelOptions" :value="key" :data-lang="value"></option></select>' +
        '<div is="vue-tree-search-box" :placeholder="placeholder" @search-event="searchEvent"></div>' +
        '<div class="tree_content_full"><ul :id="treeid" class="ztree "></ul></div>' +
        '</div>',
    methods: {
        changeChannelType: function () {
            this.$dispatch('change-event', this.channelType, this.treeid)
        },
        searchEvent: function (keyword) {
            this.$dispatch('search-event', keyword, this.treeid)
        }
    },
    components: {
        'vue-tree-search-box': searchBox
    }
});

var treeTemplate = Vue.extend({
    props: {
        showsearch:{
            type:Boolean,
            default:true
        },
        treeid: {
            type: String,
            default: "tree",
            required: true
        },
        treetitle: {
            type: String,
            default: "treeTitle"
        },
        placeholder: {
            type: String,
            default: "请输入关键字"
        },
        style:{
            default:''
        }
    },
    data: function () {
        return {
            keyword: ""
        }
    },
    template: '<div class="section_header">{{treetitle}}</div>' +
    '<div class="section_content section_content_full">' +
    '<div v-show="showsearch" is="vue-tree-search-box" :placeholder="placeholder" @search-event="searchEvent"></div>' +
    '<div class="tree_content_full"  :style="treeStyle"><ul :id="treeid" class="ztree "></ul></div>' +
    '</div>',
    computed:{
        treeStyle: function () {
            var style= {};
            if (!this.showsearch) {
                style.top='10px'
            }
            return style;
        }
    },
    methods:{
        searchEvent: function (keyword) {
            this.$dispatch('search-event', keyword,this.treeid)
        }
    },
    components: {
        'vue-tree-search-box': searchBox
    }
});


var vueButton = Vue.extend({
    props: {
        classname: {
            type: String,
            default: "",
            required: true
        },
        title: {
            type: String,
            default: ""
        }
    },
    template: '<button type="button" class="button" @click.stop.prevent="clickEvent"><span class="button_func_icon {{classname}} left" ></span><span>{{title}}</span></button>',
    methods: {
        clickEvent: function () {
            this.$dispatch("click-event")
        }
    }
});
var vueButtonNoIcon = Vue.extend({
    props: {
        classname: {
            type: String,
            default: "",
            required: true
        },
        title: {
            type: String,
            default: ""
        }
    },
    template: '<button type="button" class="button button_noicon" @click.stop.prevent="clickEvent">{{title}}</button>',
    methods: {
        clickEvent: function () {
            this.$dispatch("click-event")
        }
    }
});

var vueSubTab = Vue.extend({
    props: {
        classname: {
            type: String,
            default: "",
            required: true
        },
        title: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    template: '<a type="button" name="deviceBtn" id="encodeDevice" class="tab" data-url="localDevice.htm" @click.stop.prevent="clickEvent">' +
    '<span class="device_icon" :class="classname"></span>' +
    '<label v-text="title"></label>' +
    '</a>',
    methods: {
        clickEvent: function () {
            this.$dispatch("click-event", this.url, this.classname)
        }
    }
});
var vueSecTab = Vue.extend({
    props: {
        classname: {
            type: String,
            default: "",
            required: true
        },
        title: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    template: '<a type="button" name="btn_encodeChl" id="btn_encodeChl" class="tab" :data-url="url" @click.stop.prevent="clickEvent">' +
    '<span class="device_icon" :class="classname"></span>' +
    '<label v-text="title"></label>' +
    '</a>',
    methods: {
        clickEvent: function () {
            this.$dispatch("click-event", this.url)
        }
    }
});

Vue.component("vue-search-box", searchBox);
Vue.component("vue-button", vueButton);
Vue.component("vue-button-noicon",vueButtonNoIcon)
Vue.component("vue-tree-template", treeTemplate);
Vue.component("vue-alarm-tree", alarmTreeTemplate);
Vue.component("vue-alarm-sub-tree", alarmSubTreeTemplate);
Vue.component("vue-custom-org-tree", customOrgTreeTemplate);

Vue.component("vue-sub-tab", vueSubTab);
Vue.component("vue-sec-tab", vueSecTab);


Vue.filter('reverse', function (value) {
    return value.split('').reverse().join('')
})
Vue.filter('htmlEncode', function (value) {
    return String(value).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
})
(function () {
    function oneOf(value, validList) {
        for (var i = 0; i < validList.length; i++) {
            if (value === validList[i]) {
                return true;
            }
        }
        return false;
    }

    function isValueNumber(value) {
        return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)/).test(value + '');
    }

    function isValueDigits(value) {
        return (/(^-?[1-9][0-9]*$)/).test(value + '');
    }

    /**************************高精度浮点数计算*********************************************/
    function accSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
    }

    function accAdd(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace('.', ''));
                arg2 = Number(arg2.toString().replace('.', '')) * cm;
            } else {
                arg1 = Number(arg1.toString().replace('.', '')) * cm;
                arg2 = Number(arg2.toString().replace('.', ''));
            }
        } else {
            arg1 = Number(arg1.toString().replace('.', ''));
            arg2 = Number(arg2.toString().replace('.', ''));
        }
        return (arg1 + arg2) / m;
    }

    /***********************************************************************/
    var VUI;
    VUI = {
        Icon: {
            template: '<i :class="calsses" :style="styles"></i>',
            props: {
                type: String,
                size: [Number, String],
                color: String
            },
            computed: {
                calsses: function () {
                    return "vui-icon vui-icon-" + this.type;
                },
                styles: function () {
                    var style = {};
                    if (!!this.size) {
                        style['font-size'] = this.size + 'px';
                    }

                    if (!!this.color) {
                        style.color = this.color;
                    }
                    return style;
                }
            }
        },
        vInput: {
            template: '<div :class="wrapClasses">' +
            '<template v-if="type !== \'textarea\'">' +
            '<div :class="[prefixCls + \'-group-prepend\']" v-if="prepend" v-show="slotReady" v-el:prepend>' +
            '<slot name="prepend"></slot>' +
            '</div>' +
            '<i class="vui-icon" :class="[\'vui-icon-\' + icon, prefixCls + \'-icon\']" v-if="icon" @click="handleIconClick"></i>' +
            '<input ' +
            ':type="type"' +
            ':class="inputClasses"' +
            ':placeholder="placeholder"' +
            ':disabled="disabled"' +
            ':maxlength="maxlength"' +
            'v-model="value"' +
            '@keyup.enter="handleEnter"' +
            '@focus="handleFocus"' +
            '@blur="handleBlur">' +
            '<div :class="[prefixCls + \'-group-append\']" v-if="append" v-show="slotReady" v-el:append>' +
            '<slot name="append"></slot>' +
            '</div>' +
            '</template>' +
            '<textarea v-else ' +
            'v-el:textarea' +
            ':class="textareaClasses"' +
            ':style="textareaStyles"' +
            ':placeholder="placeholder"' +
            ':disabled="disabled"' +
            ':rows="rows"' +
            ':maxlength="maxlength"' +
            ':readonly="readonly"' +
            'v-model="value"' +
            '@keyup.enter="handleEnter"' +
            '@focus="handleFocus"' +
            '@blur="handleBlur">' +
            '</textarea>' +
            '</div>',
            props: {
                type: {
                    validator: function (value) {
                        return oneOf(value, ["text", "textarea", "password"]);
                    },
                    default: 'text'
                },
                value: {
                    type: [String, Number],
                    default: '',
                    twoWay: true
                },
                size: {
                    validator: function (value) {
                        return oneOf(value, ['small', 'large'])
                    }
                },
                placeholder: {
                    type: String,
                    default: ''
                },
                maxlength: {
                    type: Number
                },
                disabled: {
                    type: Boolean,
                    default: false
                },
                icon: String,
                autosize: {
                    type: [Boolean, Object],
                    default: false
                },
                rows: {
                    type: Number,
                    default: 2
                },
                readonly: {
                    type: Boolean,
                    default: false
                }
            },
            data: function () {
                return {
                    prefixCls: "vui-input",
                    prepend: true,
                    append: true,
                    slotReady: false,
                    textareaStyled: {}
                }
            },
            computed: {
                wrapClasses: function () {
                    var wrapperCls = this.prefixCls + '-wrapper',
                        sizeCls = this.prefixCls + '-wrapper-' + this.size,
                        type = this.prefixCls + '-type';

                    return [
                        wrapperCls,
                        !!this.size ? sizeCls : ''
                    ]
                },
                inputClasses: function () {
                    var sizeCls = this.prefixCls + '-wrapper-' + this.size,
                        disabledCls = this.prefixCls + '-disabled';
                    return [
                        this.prefixCls,
                        !!this.size ? sizeCls : '',
                        this.disabled ? disabledCls : ''
                    ]
                },
                textareaClasses: function () {
                    var disabledCls = this.prefixCls + '-disabled';
                    return [
                        this.prefixCls,
                        this.disabled ? disabledCls : ''
                    ]
                }
            },
            methods: {
                handleEnter: function () {
                    this.$emit('on-enter');
                },
                handleIconClick: function () {
                    this.$emit('on-click');
                },
                handleFocus: function () {
                    this.$emit('on-focus');
                },
                handleBlur: function () {
                    this.$emit('on-blur');
                },
            },
            watch: {
                value: function (val) {
                    this.$emit('on-change', val);
                }
            },
            ready: function () {
                if (this.type === 'text') {
                    this.prepend = this.$els.prepend.innerHTML !== '';
                    this.append = this.$els.append.innerHTML !== '';
                } else {
                    this.prepend = false;
                    this.append = false;
                }
                this.slotReady = true;
            }
        },
        vInputNumber: {
            template: '<div :class="wrapClasses">' +
            '<div :class="handlerClasses">' +
            '<span :class="upClasses" @click="up"><span :class="innerUpClasses"></span></span>' +
            '<span :class="downClasses" @click="down"><span :class="innerDownClasses"></span></span>' +
            '</div>' +
            '<div :class="inputWrapClasses">' +
            '<input type="text" ' +
            ':class="inputClasses"' +
            ':disabled="disabled"' +
            'autocomplete="off"' +
            '@focus="focus"' +
            '@blur="blur"' +
            '@keydown.stop="keyDown"' +
            '@change="change"' +
            ':value="value">' +
            '</div>' +
            '</div>',
            props: {
                max: {
                    type: Number,
                    default: Infinity
                },
                min: {
                    type: Number,
                    default: -Infinity
                },
                step: {
                    type: Number,
                    default: 1
                },
                value: {
                    type: Number,
                    default: 1
                },
                size: {
                    validator: function (value) {
                        return oneOf(value, ['small', 'large'])
                    }
                },
                disabled: {
                    type: Boolean,
                    default: false
                },
                digits: {
                    type: Boolean,
                    default: false
                }
            },
            data: function () {
                return {
                    prefixCls: "vui-input-number",
                    focused: false,
                    upDisabled: false,
                    downDisabled: false
                }
            },
            computed: {
                wrapClasses: function () {
                    return [
                        this.prefixCls,
                        !!this.size ? this.prefixCls + '-wrap-' + this.size : '',
                        !!this.disabled ? this.prefixCls + '-disabled' : '',
                        !!this.focused ? this.prefixCls + '-focused' : ''
                    ]
                },
                handlerClasses: function () {
                    return [
                        this.prefixCls + "-handler-wrap"
                    ]
                },
                upClasses: function () {
                    return [
                        this.prefixCls + '-handler',
                        this.prefixCls + '-handler-up',
                        this.upDisabled ? this.prefixCls + '-handler-up-disabled' : ''
                    ]
                },
                downClasses: function () {
                    return [
                        this.prefixCls + '-handler',
                        this.prefixCls + '-handler-down',
                        this.downDisabled ? this.prefixCls + '-handler-down-disabled' : ''

                    ]
                },
                innerUpClasses: function () {
                    return [
                        this.prefixCls + '-handler-up-inner'
                    ]
                },
                innerDownClasses: function () {
                    return [
                        this.prefixCls + '-handler-down-inner'
                    ]
                },
                inputWrapClasses: function () {
                    return [
                        this.prefixCls + '-input-wrap'
                    ]
                },
                inputClasses: function () {
                    return [
                        this.prefixCls + '-input',
                    ]
                }
            },
            methods: {
                up: function () {
                    if (this.upDisabled) {
                        return false;
                    }
                    this.changeStep("up")
                },
                down: function () {
                    if (this.downDisabled) {
                        return false;
                    }
                    this.changeStep("down")
                },
                addNum: function (value, step) {
                    return value + step;
                },
                changeStep: function (type) {
                    if (this.disabled) {
                        return false;
                    }
                    var val = Number(this.value),
                        step = Number(this.step);
                    if (isNaN(val)) {
                        return false;
                    }
                    if (type === 'up') {
                        val = accAdd(val, step);
                    } else if (type === 'down') {
                        val = accSub(val, step);
                    }
                    this.setValue(val);
                },
                setValue: function (val) {
                    this.$nextTick(function () {
                        this.value = val;
                    });
                    this.$emit('on-change', val);
                },
                focus: function () {
                    this.focused = true;
                },
                blur: function () {
                    this.focused = false;
                },
                keyDown: function (e) {
                    if (e.keyCode === 38) {
                        e.preventDefault();
                        this.up()
                    } else if (e.keyCode === 40) {
                        e.preventDefault();
                        this.down()
                    }
                },
                change: function (event) {
                    var val = event.target.value.trim();

                    var max = this.max;
                    var min = this.min;

                    if (isValueNumber(val)) {
                        val = Number(val);
                        if (this.digits) {
                            val = Math.round(val);
                        }
                        this.value = val;

                        if (val > max) {
                            this.setValue(max);
                        } else if (val < min) {
                            this.setValue(min);
                        } else {
                            this.setValue(val);
                        }
                    } else {
                        event.target.value = this.value;
                    }
                },
                changeVal: function (val) {
                    if (isValueNumber(val) || val === 0) {
                        val = Number(val);
                        var step = this.step;

                        this.upDisabled = val + step > this.max;
                        this.downDisabled = val - step < this.min;
                    } else {
                        this.upDisabled = true;
                        this.downDisabled = true;
                    }
                }

            },
            ready: function () {
                this.changeVal(this.value);
            },
            watch: {
                value: function (val) {
                    this.changeVal(val);
                }
            }
        },
        vSearchBox: {
            template: '<v-input :value.sync="keyword" icon="search" :placeholder="placeholder" @on-enter="search"  @on-click="search" class="right"></v-input>',
            props: {
                placeholder: {
                    type: String,
                    default: "请输入关键字"
                }
            },
            data: function () {
                return {
                    keyword: ""
                }
            },
            methods: {
                search: function () {
                    this.$dispatch('search-event', this.keyword)
                }
            }
        },
    };
    VUI.vButton = {
        template: '<button type="button" :class="buttonClasses" :disabled="disabled">' +
        '<i :class="typeIconClasses" v-if="icon"></i>' +
        '<span v-show="showSlot" v-el:slot><slot></slot></span>' +
        '</button>',
        props: {
            shape: {
                type: String,
                validator: function (value) {
                    return oneOf(value, ['circle'])
                }
            },
            icon: String,
            loading: Boolean,
            disabled: Boolean,
            type: {
                type: String,
                validator: function (value) {
                    return oneOf(value, ['ghost', 'primary', 'minor'])
                },
                default: 'ghost'
            },
            size: {
                type: String,
                validator: function (value) {
                    return oneOf(value, ['small', 'large'])
                }
            }
        },
        data: function () {
            return {
                prefixCls: 'vui-button',
                showSlot: true
            }
        },
        computed: {
            buttonClasses: function () {
                return [
                    this.prefixCls,
                    !!this.icon ? this.prefixCls + '-icon' : '',
                    !!this.size ? this.prefixCls + '-' + this.size : '',
                    !!this.type ? this.prefixCls + '-' + this.type : '',
                    !!this.shape ? this.prefixCls + '-' + this.shape : '',
                    !this.showSlot && (!!this.icon || this.loading) ? this.prefixCls + '-icon-only' : ''

                ]
            },
            typeIconClasses: function () {
                return [
                    'vui-icon',
                    this.icon ? 'vui-icon-' + this.icon : ''
                ]
            }
        },
        ready: function () {
            this.showSlot = this.$els.slot.innerHTML.replace(/\n/g, '').replace(/<!--[\w\W\r\n]*?-->/gmi, '') !== '';
        }
    }
    VUI.loadingBar = {
        template: '' +
        '<div :class="classes" :style="outerStyles" v-show="show" transition="fade">' +
        '<div :class="innerClasses" :style="styles"></div>' +
        '</div>',
        props: {
            percent: {
                type: Number,
                default: 0
            },
            color: {
                type: String,
                default: 'primary'
            },
            failedColor: {
                type: String,
                default: 'error'
            },
            height: {
                type: Number,
                default: 2
            },
            status: {
                type: String,
                validator: function (value) {
                    return oneOf(value, ['success', 'error']);
                },
                default: 'success'
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                prefixCls: 'vui-loading-bar'
            }
        },
        computed: {
            classes: function () {
                return this.prefixCls;
            },
            innerClasses: function () {
                return [
                    this.prefixCls + '-inner',
                    this.color === 'primary' && this.status === 'success' ? this.prefixCls + '-inner-color-primary' : '',
                    this.failedColor === 'error' && this.status === 'error' ? this.prefixCls + '-inner-failed-color-error' : ''
                ]
            },
            outerStyles: function () {
                return {
                    height: this.height + 'px'
                }
            },
            styles: function () {
                var style = {
                    width: this.percent + '%',
                    height: this.height + 'px'
                };

                if (this.color !== 'primary' && this.status === 'success') {
                    style.backgroundColor = this.color;
                }

                if (this.failedColor !== 'error' && this.status === 'error') {
                    style.backgroundColor = this.failedColor;
                }

                return style;
            }
        }

    }

    Object.keys(VUI).forEach(function (key) {
        Vue.component(key, VUI[key]);
    })
    var loadingBar = (function exportLoadingBar() {
        var LOADINGBAR = {};

        function camelcaseToHyphen(str) {
            return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }

        LOADINGBAR.newInstance = function (properties) {
            var _props = properties || {};

            var props = '';
            Object.keys(_props).forEach(function (prop) {
                props += ' :' + camelcaseToHyphen(prop) + '=' + prop;
            });

            var div = document.createElement('div');
            div.innerHTML = '<loading-bar ' + props + '></loading-bar>';
            document.body.appendChild(div);

            var loading_bar = new Vue({
                el: div,
                data: _props
            }).$children[0];

            return {
                update: function (options) {
                    if ('percent' in options) {
                        loading_bar.percent = options.percent;
                    }
                    if (options.status) {
                        loading_bar.status = options.status;
                    }
                    if ('show' in options) {
                        loading_bar.show = options.show;
                    }
                },
                component: loading_bar,
                destroy: function () {
                    document.body.removeChild(div);
                }
            }
        };

        var loadingBarInstance;
        var color = 'primary';
        var failedColor = 'error';
        var height = 2;
        var timer;

        function getLoadingBarInstance() {
            loadingBarInstance = loadingBarInstance || LOADINGBAR.newInstance({
                    color: color,
                    failedColor: failedColor,
                    height: height
                });

            return loadingBarInstance;
        }

        function update(options) {
            var instance = getLoadingBarInstance();

            instance.update(options);
        }

        function hide() {
            setTimeout(function () {
                update({
                    show: false
                });
                setTimeout(function () {
                    update({
                        percent: 0
                    });
                }, 200)
            }, 800);
        }

        function clearTimer() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        return {
            start: function () {
                var percent = 0;
                update({
                    percent: percent,
                    status: 'success',
                    show: true
                });
                if (timer) {
                    clearTimer()
                }
                timer = setInterval(function () {
                        percent += Math.floor(Math.random() * 3 + 5);
                        if (percent > 95) {
                            clearTimer();
                            return ;
                        }
                        update({
                            percent: percent,
                            status: 'success',
                            show: true
                        });
                    },
                    200
                );
            },
            update: function (percent) {

                clearTimer();
                update({
                    percent: percent,
                    status: 'success',
                    show: true
                });
            },
            finish: function () {
                clearTimer();
                update({
                    percent: 100,
                    status: 'success',
                    show: true
                });
                hide();
            },
            error: function () {
                clearTimer();
                update({
                    percent: 100,
                    status: 'error',
                    show: true
                });
                hide();
            },
            config: function (options) {
                if (options.color) {
                    color = options.color;
                }
                if (options.failedColor) {
                    failedColor = options.failedColor;
                }
                if (options.height) {
                    height = options.height;
                }
            },
            destroy: function () {
                clearTimer();
                var instance = getLoadingBarInstance();
                loadingBarInstance = null;
                instance.destroy();
            }
        }
    }())
    window.$loading = Vue.prototype.$loading = loadingBar;
}())
