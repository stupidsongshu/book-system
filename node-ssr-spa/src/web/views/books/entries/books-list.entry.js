import Banner from '../../../components/banner/index'

Banner.init()

$(function() {
  $('.btn-action').click(function() {
    alert('test')
  })
})

console.log('books-list init')