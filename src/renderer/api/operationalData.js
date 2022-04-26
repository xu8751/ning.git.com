import db from '@/utils/db'

export function adddata (data) {
  return new Promise((resolve, reject) => {
    db.insert(data, (err, newdoc) => {
      if (err) {
        reject(err)
        return false
      }
      resolve(newdoc)
    })
  })
}
export function finddata (query) {
  return new Promise((resolve, reject) => {
    db.find(query, (err, res) => {
      if (err) {
        reject(err)
        return false
      }
      resolve(res)
    })
  })
}
export function findone (query) {
  return new Promise((resolve, reject) => {
    db.findOne(query, (err, res) => {
      if (err) {
        reject(err)
        return false
      }
      resolve(res)
    })
  })
}
export function deleone (query) {
  return new Promise((resolve, reject) => {
    db.remove(query, (err, number) => {
      if (err) {
        reject(err)
        return false
      }
      resolve(number)
    })
  })
}
export function deleall (query) {
  return new Promise((resolve, reject) => {
    db.remove(query, {
      multi: true
    }, (err, number) => {
      if (err) {
        reject(err)
        return false
      }
      resolve(number)
    })
  })
}
db.loadDatabase(function (err) {    // 回调函数(可选)
  // Now commands will be executed
  // console.log(data);
});
// export default {
//  adddata (data) {
//     return new Promise((resolve, reject) => {
//       db.insert(data, (err, newdoc) => {
//         if (err) {
//           reject(err)
//           return false
//         }
//         resolve(newdoc)
//       })
//     })
//   },
//   finddata (query) {
//     return new Promise((resolve, reject) => {
//       db.find(query, (err, res) => {
//         if (err) {
//           reject(err)
//           return false
//         }
//         resolve(res)
//       })
//     })
//   },
//   findone (query) {
//     return new Promise((resolve, reject) => {
//       db.findOne(query, (err, res) => {
//         if (err) {
//           reject(err)
//           return false
//         }
//         resolve(res)
//       })
//     })
//   },
//   deleone (query) {
//     return new Promise((resolve, reject) => {
//       db.remove(query, (err, number) => {
//         if (err) {
//           reject(err)
//           return false
//         }
//         resolve(number)
//       })
//     })
//   },
//   deleall (query) {
//     return new Promise((resolve, reject) => {
//       db.remove(query, {
//         multi: true
//       }, (err, number) => {
//         if (err) {
//           reject(err)
//           return false
//         }
//         resolve(number)
//       })
//     })
//   }
// }
