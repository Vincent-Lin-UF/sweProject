// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Cookies from 'universal-cookie'
//
// const cookies = new Cookies()
//
// export default function Profile() {
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     bio: '',
//     avatarUrl: ''
//   })
//   const [isEditing, setIsEditing] = useState(false)
//   const router = useRouter()
//
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // fetch from api
//         const userData = {
//           name: 'BBL Drizzy',
//           email: 'anthonylovesBBLDrizzy@helicop.ter',
//           bio: 'i glaze drizzy drake, he did no wrong. i love his meat',
//           avatarUrl: 'https://github.com/shadcn.png'
//         }
//         setUser(userData)
//       } catch (error) {
//         console.error('Error fetching user data:', error)
//       }
//     }
//
//     fetchUserData()
//   }, [])
//
//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setUser(prevUser => ({ ...prevUser, [name]: value }))
//   }
//
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log('Updated user data:', user)
//
//     try {
//       const response = await fetch('/api/users/update-profile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${cookies.get('token')}`
//         },
//         body: JSON.stringify(user),
//       })
//
//       if (response.ok) {
//         console.log('Profile updated successfully')
//         setIsEditing(false)
//       } else {
//         console.log('Profile update failed')
//         // Handle update error (e.g., show error message)
//       }
//     } catch (error) {
//       console.error('Profile update error:', error)
//       // Handle network error
//     }
//   }
//
//   const handleLogout = () => {
//     cookies.remove('token', { path: '/' })
//     router.push('/login')
//   }
//
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <div className="flex flex-col items-center">
//           <Avatar className="w-24 h-24">
//             <AvatarImage src={user.avatarUrl} alt={user.name} />
//             <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//           </Avatar>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {isEditing ? 'Edit Profile' : 'Your Profile'}
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4 rounded-md shadow-sm">
//             <div>
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 value={user.name}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="mt-1"
//               />
//             </div>
//             <div>
//               <Label htmlFor="email">Email address</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={user.email}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="mt-1"
//               />
//             </div>
//             <div>
//               <Label htmlFor="bio">Bio</Label>
//               <Textarea
//                 id="bio"
//                 name="bio"
//                 rows={4}
//                 value={user.bio}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="mt-1"
//               />
//             </div>
//           </div>
//
//           {isEditing ? (
//             <div className="flex space-x-4">
//               <Button type="submit" className="flex-1">
//                 Save Changes
//               </Button>
//               <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
//                 Cancel
//               </Button>
//             </div>
//           ) : (
//             <Button type="button" onClick={() => setIsEditing(true)} className="w-full">
//               Edit Profile
//             </Button>
//           )}
//         </form>
//         <Button variant="outline" onClick={handleLogout} className="w-full">
//           Log Out
//         </Button>
//       </div>
//     </div>
//   )
// }
