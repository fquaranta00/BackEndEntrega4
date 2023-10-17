(function() {
  const socket = io();


  const form = document.getElementById('form');
  const title = document.getElementById('form-title');
  const description = document.getElementById('form-description');
  const code = document.getElementById('form-code');
  const price = document.getElementById('form-price');
  const stock = document.getElementById('form-stock');
  const category = document.getElementById('form-category');

  form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const body = {
      title:title.value,
      description:description.value,
      code:code.value,
      price:price.value,
      status:status.value,
      stock:stock.value,
      category:category.value,
      thumbnail: []
    }
    socket.emit('new-product', body);
  })

})();


  // socket.emit('message', 'Hola backend desde el cliente web via socket.io 🎯');

  // socket.on('direct_client', (data) => {
  //   console.log(data);
  // });

  // socket.on('all_client', (data) => {
  //   console.log(data);
  // });

  // socket.on('all_socket', (data) => {
  //   console.log(data);
  // });
// })();