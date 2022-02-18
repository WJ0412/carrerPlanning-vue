import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/Login')
    },
    {
        path: '/adminHome',
        name: 'AdminHome',
        component: () => import('@/components/Admin/AdminHome'),
        children: [
            {
                path: '/',
                redirect: '/welcome'
            },
            {
                path: '/welcome',
                name: 'Welcome',
                component: () => import('@/components/Admin/Welcome')
            },
            {
                path: '/adminCollege',
                name: 'AdminCollege',
                component: () => import('@/components/Admin/AdminCollege')
            },
            {
                path: '/adminMajor',
                name: 'AdminMajor',
                component: () => import('@/components/Admin/AdminMajor')
            },
            {
                path: '/adminTeacher',
                name: 'AdminTeacher',
                component: () => import('@/components/Admin/AdminTeacher')
            },
            {
                path: '/adminClass',
                name: 'AdminClasses',
                component: () => import('@/components/Admin/AdminClass')
            },
            {
                path: '/adminStudent',
                name: 'AdminStudent',
                component: () => import('@/components/Admin/AdminStudent')
            },
            {
                path: '/adminData',
                name: 'AdminData',
                component: () => import('@/components/Admin/AdminData')
            },
            {
                path: '/adminSystem',
                name: 'AdminSystem',
                component: ()=> import('@/components/Admin/AdminSystem')
            },
            {
                path: '/summary',
                name: 'Summary',
                component: ()=> import('@/components/Admin/Summary')
            }
        ]
    },
    {
        path: '/teacherHome',
        name: 'TeacherHome',
        component: () => import('@/components/Teacher/TeacherHome'),
        children: [
            {
                path: '/',
                redirect: '/teacherWelcome'
            },
            {
                path: '/teacherWelcome',
                name: 'TeacherWelcome',
                component: () => import('@/components/Teacher/TeacherWelcome')
            },
            {
                path: '/manageInfo',
                name: 'ManageInfo',
                component: () => import('@/components/Teacher/ManageInFo')
            },
            {
                path: '/manageFamily',
                name: 'ManageFamily',
                component: () => import('@/components/Teacher/ManageFamily')
            },
            {
                path: '/manageOther',
                name: 'ManageOther',
                component: () => import('@/components/Teacher/ManageOther')
            },
            {
                path: '/manageRenZhi',
                name: 'ManageRenZhi',
                component: () => import('@/components/Teacher/ManageRenZhi')
            },
            {
                path: '/manageSuccess',
                name: 'ManageSuccess',
                component: () => import('@/components/Teacher/ManageSuccess')
            },
            {
                path: '/manageJob',
                name: 'ManageJob',
                component: () => import('@/components/Teacher/ManageJob')
            },
            {
                path: '/manageBusiness',
                name: 'ManageBusiness',
                component: () => import('@/components/Teacher/ManageBusiness')
            },
            {
                path: '/manageShiYe',
                name: 'ManageShiYe',
                component: () => import('@/components/Teacher/ManageShiYe')
            }
        ]
    },
    {
        path: '/studentHome',
        name: 'StudentHome',
        component: ()=> import('@/components/Student/StudentHome'),
        children:[
            {
                path: '/',
                redirect: '/swelcome'
            },
            {
                path: '/swelcome',
                name: 'Welcome',
                component: ()=> import('@/components/Student/Welcome')
            },
            {
                path: '/studentBaseInfo',
                name: 'StudentBaseInfo',
                component: () => import('@/components/Student/StudentBaseInfo')
            },
            {
                path: '/studentFamilyInfo',
                name: 'StudentFamilyInfo',
                component: () => import('@/components/Student/StudentFamilyInfo')
            },
            {
                path: '/studentOtherInfo',
                name: 'StudentOtherInfo',
                component: () => import('@/components/Student/StudentOtherInfo')
            },{
                path: '/studentCognition',
                name: 'StudentCognition',
                component: () => import('@/components/Student/studentCognition')
            },{
                path: '/stuSuccessfulPlanning',
                name: 'StuSuccessfulPlanning',
                component: () => import('@/components/Student/StuSuccessfulPlanning')
            },{
                path: '/stuBusinessPlanning',
                name: 'StuBusinessPlanning',
                component: () => import('@/components/Student/StuBusinessPlanning')
            },{
                path: '/stuCareerPlanning7',
                name: 'StuCareerPlanning7',
                component: () => import('@/components/Student/StuCareerPlanning7')
            },
            ,{
                path: '/stuEmploymentPlanning',
                name: 'StuEmploymentPlanning',
                component: () => import('@/components/Student/StuEmploymentPlanning')
            }
        ]
    },
    {
        path: '/collegeHome',
        name: 'CollegeHome',
        component: () => import('@/components/College/AdminHome'),
        children: [
            {
                path: '/',
                redirect: '/collegeWelcome'
            },
            {
                path: '/collegeWelcome',
                name: 'CollegeWelcome',
                component: () => import('@/components/College/Welcome')
            },
            {
                path: '/collegeCollege',
                name: 'CollegeCollege',
                component: () => import('@/components/College/AdminCollege')
            },
            {
                path: '/collegeMajor',
                name: 'CollegeMajor',
                component: () => import('@/components/College/AdminMajor')
            },
            {
                path: '/collegeTeacher',
                name: 'CollegeTeacher',
                component: () => import('@/components/College/AdminTeacher')
            },
            {
                path: '/collegeClass',
                name: 'CollegeClasses',
                component: () => import('@/components/College/AdminClass')
            },
            {
                path: '/collegeStudent',
                name: 'CollegeStudent',
                component: () => import('@/components/College/AdminStudent')
            },
            {
                path: '/collegeSummary',
                name: 'CollegeSummary',
                component: ()=> import('@/components/College/Summary')
            }
        ]
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
//  to:将要访问的路径
//  from:代表从哪个路径跳转而来
//  next:是一个函数 表示放行
    if (to.path === '/login') return next()
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router
