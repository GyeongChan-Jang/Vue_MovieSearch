export default {
  // 하나의 store들을 관심사에 맞게 구분하기 위해!
  namespaced: true, // about.js가 store에 하나의 모듈이 될 수 있도록! -> Index.js 에서 해당 이름으로 모듈 등록
  // state가 함수형태인 이유? -> 객체데이터는 참조형 데이터, 불변성을 유지하기 위해 함수가 return하는 형태로 만듦
  state: () => ({
    name: 'GyeongChan',
    email: 'cham9994@gmail.com',
    blog: 'https://velog.io/@zerone',
    github: 'https://github/cham9994',
    phone: '+82-10-7562-9994',
    image: 'https://avatars.githubusercontent.com/u/90392240?s=400&u=740a9f506baa38d97ff5a28d6160eb00cfa656f1&v=4'
  })
}
