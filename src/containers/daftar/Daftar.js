import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
// import Feature from '../../components/feature/Feature';
import './daftar.css';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select/'

const Daftar = () => {

    const navigate = useNavigate()
    const [propinsi, setPropinsi] = useState([])
    const [kota, setKota] = useState([])
    const [kepemilikan, setKepemilikan] = useState([])
    const [idProp, setIdProp] = useState();
    const [idKabKot, setIdKabKot] = useState();
    const [idKepemilikan, setIdKepemilikan] = useState();
    const [optionsProp, setOptionsProp] = useState([]);
    const [optionsKabKot, setOptionsKabKot] = useState([]);
    const [jenis, setJenisFaskes] = useState(0);
    const [data, setData] = useState({
        jenis_faskes_lain_id: 4,
        nama_institusi: "",
        propinsi_id: 0,
        kota_id: 0,
        alamat: "",
        kepemilikan_id: 0,
        no_telp: "",
        website: "",
        media_sosial: "",
        nama_pj: "",
        nama_pj_lab_kalibrasi: "",
        nama_pj_mutu: "",
        contact_person: "",
        nomor_izin_operasional: "",
        tanggal_izin_operasional: "1971-01-01",
        nomor_sk: "",
        tanggal_sk: "1971-01-01",
        email: ""
        // ,
        // dokumen_izin_operasional: "tes"
    })

    useEffect(() => {
        getPropinsi()
        getKabKot()
        getKepemilikan()
    }, [])

    const getPropinsi = async () => {
        try {
            const response = await axios.get('/apibpfk/propinsi')
            const propinsiTemplate = response.data.data.map((value, index) => {
                return {
                    key: value.id,
                    value: value.nama
                }
            })
            setOptionsProp([{ key: "", value: "--Pilih Propinsi--" }, ...propinsiTemplate]);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }
    const getKepemilikan = async () => {
        try {
            const response = await axios.get('/apibpfk/kepemilikan')
            const kepemilikanTemplate = response.data.data.map((value, index) => {
                return {
                    key: value.id,
                    value: value.nama
                }
            })
            setKepemilikan([{ key: "", value: "--Pilih Kepemilikan--" }, ...kepemilikanTemplate])
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }

    const getKota = async (id) => {
        try {
            const response = await axios.get('/apibpfk/kota?propid=' + id)
            const kotaTemplate = response.data.data.map((value, index) => {
                return {
                    value: value.id,
                    label: value.nama
                }
            })
            setKota(kotaTemplate)

        } catch (error) {
            console.log(error)
        }
    }

    const getKabKot = async (e) => {

        setOptionsKabKot([]);
        // if (e.target.value.length > 0) {
        try {
            let cek = e.target.value;
            const response = await axios.get(
                "/apibpfk/kota?propid=" + e.target.value,
            );
            const detailKabKot = response.data.data.map((value) => {
                return value;
            });
            const resultsKabKot = [];
            detailKabKot.forEach((value) => {
                resultsKabKot.push({
                    key: value.id,
                    value: value.nama,
                });
            });
            console.log(resultsKabKot)
            setOptionsKabKot([...resultsKabKot]);
            setIdProp(cek);
        } catch (error) {
            if (error.response) {
                console.log(error);
            }
        }
    }
    // const changeHandlerKabKot = (event) => {
    //     setIdKabKot(event.target.value);
    // }


    function refreshPage() {
        window.location.reload(false);
    }

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(
                0,
                object.target.maxLength
            );
        }
    };

    const changeHandlerKota = (selectedOption) => {
        let newData = [...data]
        newData[0].kota_id = parseInt(selectedOption.value)
        setData(newData)
    }

    const changeHandler = (event) => {
        // alert('hi')
        let newData = data
        newData.propinsi_id = parseInt(idProp)
        // newData[0].kota_id =parseInt(idKabKot)
        const name = event.target.name
        if (name === 'jenis_faskes_lain_id') {
            setJenisFaskes(event.target.value)
            newData.jenis_faskes_lain_id = parseInt(event.target.value)
        } else if (name === 'nama_institusi') {
            newData.nama_institusi = event.target.value
        } else if (name === 'alamat') {
            newData.alamat = event.target.value
        } else if (name === 'kabkota') {
            newData.kota_id = parseInt(event.target.value)
        } else if (name === 'kepemilikan_id') {
            newData.kepemilikan_id = parseInt(event.target.value)
        } else if (name === 'no_telp') {
            newData.no_telp = event.target.value
        } else if (name === 'website') {
            newData.website = event.target.value
        } else if (name === 'media_sosial') {
            newData.media_sosial = event.target.value
        } else if (name === 'nama_pj') {
            newData.nama_pj = event.target.value
        } else if (name === 'nama_pj_lab_kalibrasi') {
            newData.nama_pj_lab_kalibrasi = event.target.value
        } else if (name === 'nama_pj_mutu') {
            newData.nama_pj_mutu = event.target.value
        } else if (name === 'contact_person') {
            newData.contact_person = event.target.value
        }
        else if (name === 'nomor_izin_operasional') {
            newData.nomor_izin_operasional = event.target.value
        } else if (name === 'tanggal_izin_operasional') {
            newData.tanggal_izin_operasional = event.target.value
        }
        else if (name === 'nomor_sk') {
            newData.nomor_sk = event.target.value
        } else if (name === 'tanggal_sk') {
            newData.tanggal_sk = event.target.value
        } else if (name === 'email') {
            newData.email = event.target.value
        }
        // else if (name === 'dokumen_izin_operasional') {

        // } 

        setData(newData)

    }


    // const Add = addrtype.map(Add => Add
    //     )

    const handleAddrTypeChange = (e) => {
        // console.clear(), 
        // console.log(e.target.value)
        // getKota(e.target.value)
        let newData = [...data]
        newData[0].propinsi_id = parseInt(e.target.value)
        setData(newData)
        console.log(data)
        console.log(e.target.name)
    }

    const simpanQuery = async () => {
        // e.preventDefault()
        try {
            let dataInsert = {}
            if (jenis == 1) {
                dataInsert = {
                    "jenis_faskes_lain_id": data.jenis_faskes_lain_id,
                    "nama_institusi": data.nama_institusi,
                    "propinsi_id": data.propinsi_id,
                    "kota_id": data.kota_id,
                    "alamat": data.alamat,
                    "kepemilikan_id": data.kepemilikan_id,
                    "no_telp": data.no_telp,
                    "website": data.website,
                    "media_sosial": data.media_sosial,
                    "nama_pj": data.nama_pj,
                    "nama_pj_lab_kalibrasi": data.nama_pj_lab_kalibrasi,
                    "nama_pj_mutu": data.nama_pj_mutu,
                    "contact_person": data.contact_person,
                    "nomor_izin_operasional": data.nomor_izin_operasional,
                    "tanggal_izin_operasional": data.tanggal_izin_operasional,
                    "email": data.email,
                }
            } else if (jenis == 2) {
                dataInsert = {
                    "jenis_faskes_lain_id": data.jenis_faskes_lain_id,
                    "nama_institusi": data.nama_institusi,
                    "propinsi_id": data.propinsi_id,
                    "kota_id": data.kota_id,
                    "alamat": data.alamat,
                    "kepemilikan_id": data.kepemilikan_id,
                    "no_telp": data.no_telp,
                    "website": data.website,
                    "media_sosial": data.media_sosial,
                    "nama_pj": data.nama_pj,
                    "contact_person": data.contact_person,
                    "nomor_sk": data.nomor_sk,
                    "tanggal_sk": data.tanggal_sk,
                    "email": data.email,
                }
            }
            // console.log("================================")
            // console.log(dataInsert)
            // console.log("================================")

            const result = await axios.post('/apibpfk/institusi',
                dataInsert
            )

            // console.log(dataArray)
            alert('Registrasi berhasil, mohon menunggu proses validasi data, kode fasyankes anda akan dikirimkan melalui email terdaftar.')

            setTimeout(() => {
                navigate('/daftar')
            }, 1000);
            refreshPage()
        } catch (error) {
            console.log(error)
            if (error.response.status == 404) {
                let tes = error.response.data.message
                const myArray = tes.split(" ");
                let m = ''
                switch (myArray[0]) {
                    case "\"nama_institusi\"":
                        m = 'Nama Institusi'
                        break;
                    case "\"propinsi_id\"":
                        m = 'Propinsi'
                        break;
                    case "\"kota_id\"":
                        m = 'Kota'
                        break;
                    case "\"alamat\"":
                        m = 'Alamat'
                        break;
                    case "\"kepemilikan_id\"":
                        m = 'Kepemilikan'
                        break;
                    case "\"no_telp\"":
                        m = 'No. Telepon Institusi'
                        break;
                    case "\"nama_pj\"":
                        m = 'Nama Pimpinan/ Penanggung Jawab'
                        break;
                    case "\"nama_pj_lab_kalibrasi\"":
                        m = 'Nama PJ Laboratorium Pengujian & Kalibrasi'
                        break;
                    case "\"nama_pj_mutu\"":
                        m = 'Nama PJ Mutu Teknis & Manajemen Pelayanan'
                        break;
                    case "\"contact_person\"":
                        m = 'Nomor Telepon Narahubung Institusi'
                        break;
                    case "\"nomor_izin_operasional\"":
                        m = 'Nomor Izin Operasional'
                        break;
                    case "\"tanggal_izin_operasional\"":
                        m = 'Nomor Izin Operasional'
                        break;
                    case "\"nomor_sk\"":
                        m = 'Nomor SK Pendirian/Penyelenggaraan'
                        break;
                    case "\"tanggal_sk\"":
                        m = 'Tanggal SK Pendirian/Penyelenggaraan'
                        break;
                    case "\"email\"":
                        m = 'Email'
                        break;
                    default:
                        break;
                }

                alert('Registrasi Gagal, ' + m + ' Tidak Boleh Kosong')

                // console.log(error)
                // const myArray = tes.split("\" \" is not allowed to be empty");
                // console.log(myArray)
                // console.log(error.response.data.message)
            } else if (error.response.data.error.name == 'SequelizeUniqueConstraintError') {
                alert('Registrasi Gagal, Email Sudah Terdaftar ')
            } else {
                alert('Registrasi Gagal, Terjadi Kesalahan')
            }

        }
    }

    const simpan = () => {
        confirmAlert({
            title: 'Konfirmasi Simpan Data',
            message: 'Apakah Anda Yakin? ',
            buttons: [
                {
                    label: 'Ya',
                    onClick: () => {
                        simpanQuery()
                        // alert('Registrasi user berhasil, mohon menunggu proses validasi data, password anda akan dikirimkan melalui email terdaftar.')
                    }
                },
                {
                    label: 'Tidak'
                }
            ]
        })
    }

    const batal = () => {
        confirmAlert({
            title: 'Konfirmasi Pembatalan',
            message: 'Apakah Anda Yakin? ',
            buttons: [
                {
                    label: 'Ya',
                    onClick: () => {
                        // refreshPage()
                    }
                },
                {
                    label: 'Tidak'
                }
            ]
        })
    }

    return (
        <div className="gpt3__daftar section__margin" id="wgpt3">
            <div className="gpt3__daftar-heading">
                <h3 className="gradient__text">PENDAFTARAN USER LOGIN BPFK/IPFK - RMC / UNIT PEMELIHARAAN PERALATAN KESEHATAN</h3>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kategori</h3>
                <select name="jenis_faskes_lain_id" id="jenis_faskes_lain_id" onChange={e => changeHandler(e)}>
                    <option value="">--Pilih Kategori Institusi--</option>
                    <option value="1">Balai Pengaman Fasilitas Kesehatan / Institusi Pengamanan Fasilitas Kesehatan</option>
                    <option value="2">Regional Maintenance Center / Unit Pemeliharaan Peralatan Kesehatan</option>
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Nama Institusi</h3>
                <input required type="text" name="nama_institusi" placeholder="Nama Institusi" onChange={e => changeHandler(e)} />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Propinsi</h3>
                <select
                    name="propinsi_id"
                    typeof="select"
                    className="form-control"
                    id="floatingselect"
                    placeholder="Propinsi"
                    onChange={getKabKot}>

                    {optionsProp.map((option) => {
                        return (
                            <option
                                key={option.key}
                                name={option.value}
                                value={option.key}
                            >
                                {option.value}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kab/Kota</h3>
                <select
                    name="kabkota"
                    typeof="select"
                    className="form-control"
                    id="floatingselect"
                    placeholder="Kabupaten / Kota"
                    onChange={(e) => changeHandler(e)}
                >
                    <option value="">--Pilih Kab/Kota--</option>
                    {optionsKabKot.map((option) => {
                        return (
                            <option
                                key={option.key}
                                value={option.key}>
                                {option.value}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Alamat</h3>
                <input required type="text" name="alamat" placeholder="Alamat" onChange={e => changeHandler(e)} />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kepemilikan</h3>
                <select
                    name="kepemilikan_id"
                    typeof="select"
                    className="form-control"
                    id="floatingselect"
                    placeholder="Kepemilikan"
                    onChange={(e) => changeHandler(e)}>

                    {kepemilikan.map((option) => {
                        return (
                            <option
                                key={option.key}
                                value={option.key}
                            >
                                {option.value}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >No. Telepon Institusi</h3>
                <input required min={0} maxLength={12} onInput={(e) => maxLengthCheck(e)} type="number" name="no_telp" placeholder="No. Telepon" onChange={e => changeHandler(e)} />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Website</h3>
                <input type="text" name="website" placeholder="Website" onChange={e => changeHandler(e)} />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Media Sosial</h3>
                <input type="text" name="media_sosial" placeholder="Media Sosial" onChange={e => changeHandler(e)} />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Nama Pimpinan/ Penanggung Jawab</h3>
                <input required type="text" name="nama_pj" placeholder="Nama Pimpinan/ Penanggung Jawab" onChange={e => changeHandler(e)} />
            </div>

            {jenis == 1 && (
                <><div className="gpt3__header-content__input">
                    <h3>Nama PJ Laboratorium Pengujian & Kalibrasi</h3>
                    <input required type="text" name="nama_pj_lab_kalibrasi" placeholder="Nama PJ Laboratorium Pengujian & Kalibrasi" onChange={e => changeHandler(e)} />
                </div><div className="gpt3__header-content__input">
                        <h3>Nama PJ Mutu Teknis & Manajemen Pelayanan</h3>
                        <input required type="text" name="nama_pj_mutu" placeholder="Nama PJ Mutu Teknis & Manajemen Pelayanan" onChange={e => changeHandler(e)} />
                    </div><div className="gpt3__header-content__input">
                        <h3>Nomor Telepon Narahubung Institusi</h3>
                        <input required min={0} maxLength={12} onInput={(e) => maxLengthCheck(e)} type="number" name="contact_person" placeholder="Contact Person" onChange={e => changeHandler(e)} />
                    </div><div className="gpt3__header-content__input">
                        <h3>Nomor Izin Operasional</h3>
                        <input required type="text" name="nomor_izin_operasional" placeholder="Nomor Izin Operasional" onChange={e => changeHandler(e)} />
                    </div><div className="gpt3__header-content__input">
                        <h3>Tanggal Izin Operasional</h3>
                        <input required type="date" name="tanggal_izin_operasional" placeholder="Tanggal Izin Operasional" onChange={e => changeHandler(e)} />
                    </div></>
            )}


            {jenis == 2 && (
                <><div className="gpt3__header-content__input">
                    <h3>Nomor Telepon Narahubung Institusi</h3>
                    <input required min={0} maxLength={12} onInput={(e) => maxLengthCheck(e)} type="number" name="contact_person" placeholder="Contact Person" onChange={e => changeHandler(e)} />
                </div><div className="gpt3__header-content__input">
                        <h3>Nomor SK Pendirian/Penyelenggaraan </h3>
                        <input required type="text" name="nomor_sk" placeholder="Nomor SK Pendirian/Penyelenggaraan" onChange={e => changeHandler(e)} />
                    </div><div className="gpt3__header-content__input">
                        <h3>Tanggal SK Pendirian/Penyelenggaraan </h3>
                        <input required type="date" name="tanggal_sk" placeholder="Tanggal SK Pendirian/Penyelenggaraan" onChange={e => changeHandler(e)} />
                    </div></>)}


            <div className="gpt3__header-content__input">
                <h3 >Email</h3>
                <input type="text" name="email" placeholder="Email" onChange={e => changeHandler(e)} />
            </div>
            {/* <div className="gpt3__header-content__input">
                <h3 >Dokumen Izin Operasional</h3>
                <input type="file" name="dokumen_izin_operasional" placeholder="Dokumen Izin Operasional" />
            </div> */}
            <div className="gpt3__header-content__input" style={{ display: "flex" }}>
                <button type="button" style={{ marginLeft: "auto" }} onClick={batal}>Batal</button>
                <button type="button" style={{ marginLeft: "30px" }} onClick={simpan}>Simpan</button>
            </div>

            {/* <div className="gpt3__daftar-container">
            <Feature title="Chatbots" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought." />
            <Feature title="Knowledgebase" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
            <Feature title="Education" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
            </div> */}
        </div>
    )

}

export default Daftar;
