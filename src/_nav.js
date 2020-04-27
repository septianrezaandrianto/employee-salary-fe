export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },

     {
      name: 'Karyawan',
      url: '/karyawan',
      icon: 'cui-chevron-right',
      children : [
        {
          name : 'List Karyawan',
          url : '/karyawan/list-karyawan',
         // icon : 'icon-people'
        },
      ],
    },

    {
      name: 'Posisi',
      url: '/posisi',
      icon: 'cui-chevron-right',
      children : [
        {
          name : 'List Posisi',
          url : '/posisi/list-posisi',
        //  icon : 'cui-paperclip'
        },
      ],
    },

    {
      name: 'Tingkatan',
      url: '/tingkatan',
      icon: 'cui-chevron-right',
      children : [
        {
          name : 'List Tingkatan',
          url : '/tingkatan/list-tingkatan',
        //  icon : 'cui-sort-descending'
        },
      ],
    },

     {
      name: 'Penempatan',
      url: '/penempatan',
      icon: 'cui-chevron-right',
      children : [
        {
          name : 'List Penempatan',
          url : '/penempatan/list-penempatan',
        //  icon : 'icon-location-pin'
        },
      ],
    },

    {
      name : 'Agama',
      url: '/agama',
      icon: 'cui-chevron-right',
      children : [
        {
          name: 'List Agama',
          url: '/agama/list-agama',
        //  icon : 'cui-lightbulb'
        },
      ],
    },

    {
      name : 'Pendapatan',
      url: '/pendapatan',
      icon: 'cui-chevron-right',
      children : [
        {
          name: 'List Pendapatan',
          url: '/pendapatan/list-pendapatan',
        //  icon : 'cui-layers'
        },
      ],
    },

    {
      name : 'Lembur Bonus',
      url: '/lembur-bonus',
      icon: 'cui-chevron-right',
      children : [
        {
          name: 'List Lembur Bonus',
          url: '/lembur-bonus/list-lembur-bonus',
        //  icon : 'cui-pencil'
        },
      ],
    },

    {
      name : 'Kategori Kemampuan',
      url: '/kategori-kemampuan',
      icon: 'cui-chevron-right',
      children : [
        {
          name: 'List Kategori Kemampuan',
          url: '/kategori-kemampuan/list-kategori-kemampuan',
        //  icon : 'cui-laptop'
        },
      ],
    },

    {
      name : 'Kemampuan',
      url: '/kemampuan',
      icon: 'cui-chevron-right',
      children : [
        {
          name: 'List Kemampuan',
          url: '/kemampuan/list-kemampuan',
        //  icon : 'cui-shield'
        },
      ],
    },

    {
      name : 'Nilai Kemampuan',
      url: '/nilai-kemampuan',
      icon: 'cui-chevron-right',
      children : [
        {
          name: 'List Nilai Kemampuan',
          url: '/nilai-kemampuan/list-nilai-kemampuan',
        ////  icon : 'cui-shield'
        },
      ],
    },

    {
      name : 'Tunjangan Pegawai',
      url: '/tunjangan-pegawai',
      icon: 'cui-chevron-right',
      children : [
        {
          name: 'List Tunjangan Pegawai',
          url: '/tunjangan-pegawai/list-tunjangan-pegawai',
        ////  icon : 'cui-shield'
        },
      ],
    },

    {
      name : 'Parameter',
      url: '/parameter',
      icon: 'cui-chevron-right',
      children : [
        {
          name: 'List Parameter',
          url: '/parameter/list-parameter',
        ////  icon : 'cui-shield'
        },
      ],
    },

    {
      name : 'Presentase Gaji',
      url: '/presentase-gaji',
      icon: 'cui-chevron-right',
      children : [
        {
          name: 'List Presentase Gaji',
          url: '/presentase-gaji/list-presentase-gaji',
        ////  icon : 'cui-shield'
        },
      ],
    },

  ],
};
