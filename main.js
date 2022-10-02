import jsYaml from 'https://cdn.skypack.dev/js-yaml';

async function main() {
  // 加载列表
  const listPath = './list.yaml'
  const res = await fetch(listPath)
  const resText = await res.text()
  const list = jsYaml.load(resText)
  // console.log(list)

  // 实例化
  const template = document.querySelector('template#member-card')
  const root = document.querySelector('#root')

  for(const member of list) {
    const node = template.content.cloneNode(true);

    const avatarUrl = member.avatar ? member.avatar : 'avatar_fallback.png'
    node.querySelector('a.avatar').href = member.url
    node.querySelector('a.avatar>img').src = avatarUrl
    
    node.querySelector('.info>a.nameline').href = member.url
    node.querySelector('.info>a.nameline>.blogname').innerText = member.blogname
    node.querySelector('.info>a.nameline>.author').innerText = "@" + member.author

    node.querySelector('.info>.description').innerText = member.description

    // 无效头像
    // if (!member.avatar) {
    //   const imgNode = node.querySelector('a.avatar>img')
    //   imgNode.parentNode.removeChild(imgNode)

    //   const bgNode = node.querySelector('a.avatar')
    //   bgNode.classList.add('avatar-miss')
    // }

  //   blogname: Tianle Zhong
  // author: 钟天乐
  // description: 这个人很懒，什么描述都没写
  // avatar: https://luosuu.github.io/assets/img/suica.jpg
  // url: https://luosuu.github.io/

    root.appendChild(node)
  }
}

main()