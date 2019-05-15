import $ from 'jquery'

export default class Intro {
	constructor(el) {
		this.$el = $(el)
		this.$btn = this.$el.find('.btn')

		this._init()
	}

	_init() {
		this._init_events()
	}

	_init_events() {
		this.$btn.on('click', (e)=>{
			this._start_quiz(e)
		})
	}

	_start_quiz(e) {
		e.preventDefault()
		console.log('CLICKED')
		this.$el.removeClass('active')
	}
}