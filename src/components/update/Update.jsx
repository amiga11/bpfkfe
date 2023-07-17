import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
// import Feature from '../../components/feature/Feature';
import "./update.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const [jenis, setJenis] = useState("");
  const [propinsi, setPropinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kepemilikan, setKepemilikan] = useState("");
  const [data, setData] = useState({});
  const [upData, setUpdData] = useState({});
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [notelp, setNotelp] = useState("");
  const [web, setWeb] = useState("");
  const [meds, setMeds] = useState("");
  const [pj, setNamapj] = useState("");
  const [kalib, setKalib] = useState("");
  const [mutu, setMutu] = useState("");
  const [cp, setCp] = useState("");
  const [nosio, setNomorsio] = useState("");
  const [tangal, setTanggal] = useState("");

  useEffect(() => {
    refreshToken();
    getDataInstitusiId();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("/apibpfk/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("/apibpfk/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getDataInstitusiId = async () => {
    try {
      const response = await axiosJWT.get("/apibpfk/institusi/id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data.data);
      setData(response.data.data);
      setJenis(response.data.data.jenis_user.jenis_user);
      setPropinsi(response.data.data.propinsi.nama_prop);
      setKota(response.data.data.kotum.nama_kota);
      setKepemilikan(response.data.data.kepemilikan.jenis_kepemilikan);
      setNotelp(response.data.data.no_telp)
      setWeb(response.data.data.website)
      setMeds(response.data.data.media_sosial)
      setNamapj(response.data.data.nama_pj)
      setKalib(response.data.data.nama_pj_lab_kalibrasi)
      setMutu(response.data.data.nama_pj_mutu)
      setCp(response.data.data.contact_person)
      setNomorsio(response.data.data.nomor_izin_operasional)
      setTanggal(response.data.data.tanggal_izin_operasional)
    } catch (error) {
      console.log(error);
    }
  };

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

  // const changeHandler = (event) => {
  //   let data = {
  //     no_telp: "",
  //     website: "",
  //     media_sosial: "",
  //     nama_pj: "",
  //     nama_pj_lab_kalibrasi: "",
  //     nama_pj_mutu: "",
  //     contact_person: "",
  //     nomor_izin_operasional: "",
  //     tanggal_izin_operasional: "1971-01-01"
  // }

  // console.log(data)

  //   const name = event.target.name;
  //   if (name === "no_telp") {
  //     data.no_telp = event.target.value;
  //   } else if (name === "website") {
  //     data.website = event.target.value;
  //   } else if (name === "media_sosial") {
  //     data.media_sosial = event.target.value;
  //   } else if (name === "nama_pj") {
  //     data.nama_pj = event.target.value;
  //   } else if (name === "nama_pj_lab_kalibrasi") {
  //     data.nama_pj_lab_kalibrasi = event.target.value;
  //   } else if (name === "nama_pj_mutu") {
  //     data.nama_pj_mutu = event.target.value;
  //   } else if (name === "contact_person") {
  //     data.contact_person = event.target.value;
  //   } else if (name === "nomor_izin_operasional") {
  //     data.nomor_izin_operasional = event.target.value;
  //   } else if (name === "tanggal_izin_operasional") {
  //     data.tanggal_izin_operasional = event.target.value;
  //   }

  //   setUpdData(data);
  // };

  const changeHandler = (event, index) => {
    // let x = {
    //       no_telp: data.no_telp,
    //       website: data.website,
    //       media_sosial: data.media_sosial,
    //       nama_pj: data.nama_pj,
    //       nama_pj_lab_kalibrasi:  data.nama_pj_lab_kalibrasi,
    //       nama_pj_mutu: data.nama_pj_mutu,
    //       contact_person: data.contact_person,
    //       nomor_izin_operasional: data.nomor_izin_operasional,
    //       tanggal_izin_operasional: data.tanggal_izin_operasional
    //   }
    const targetName = event.target.name;
    switch (targetName) {
      case "no_telp":
        if (event.target.value === "") {
          event.target.value = data.no_telp
          event.target.select(event.target.value);
        }
        console.log('inilohhh '+event.target.value)
        setNotelp(event.target.value);
        break;
      case "website":
        if (event.target.value === "") {
          event.target.value = data.website;
        }
        setWeb(event.target.value);
        break;
      case "media_sosial":
        if (event.target.value === "") {
          event.target.value = data.media_sosial;
        }
        setMeds(event.target.value);
        break;
      case "nama_pj":
        if (event.target.value === "") {
          event.target.value = data.nama_pj;
        }
        setNamapj(event.target.value);
        break;
      case "nama_pj_lab_kalibrasi":
        if (event.target.value === "") {
          event.target.value = data.nama_pj_lab_kalibrasi;
        }
        setKalib(event.target.value);
        break;
      case "nama_pj_mutu":
        if (event.target.value === "") {
          event.target.value = data.nama_pj_mutu;
        }
        setMutu(event.target.value);
        break;
      case "contact_person":
        if (event.target.value === "") {
          event.target.value = data.contact_person;
        }
        setCp(event.target.value);
        break;
      case "nomor_izin_operasional":
        if (event.target.value === "") {
          event.target.value = data.nomor_izin_operasional;
        }
        setNomorsio(event.target.value);
        break;
      case "tanggal_izin_operasional":
        if (event.target.value === "") {
          event.target.value = data.tanggal_izin_operasional;
        }
        setTanggal(event.target.value);
        break;
      default:
        break;
    }
    // console.log(x);
    // setUpdData(x);
  };

  const updateQuery = async () => {
    // e.preventDefault()
    try {
      const dataInsert = {
        no_telp: notelp,
        website: web,
        media_sosial: meds,
        nama_pj: pj,
        nama_pj_lab_kalibrasi: kalib,
        nama_pj_mutu: mutu,
        contact_person: cp,
        nomor_izin_operasional: nosio,
        tanggal_izin_operasional: tangal,
      };

      console.log(dataInsert);

      // const result = await axios.patch("/apibpfk/institusi", dataInsert);

      alert("Update Data Berhasil.");

      // setTimeout(() => {
      //     navigate('/daftar')
      // }, 1000);
      // refreshPage()
    } catch (error) {
      alert("Data gagal disimpan, pastikan telah mengisi semua field");
      console.log(error);
    }
  };

  const simpan = () => {
    confirmAlert({
      title: "Konfirmasi Simpan Data",
      message: "Apakah Anda Yakin? ",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            updateQuery();
            // refreshPage();
          },
        },
        {
          label: "Tidak",
        },
      ],
    });
  };

  const batal = () => {
    confirmAlert({
      title: "Konfirmasi Pembatalan",
      message: "Apakah Anda Yakin? ",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            refreshPage();
          },
        },
        {
          label: "Tidak",
        },
      ],
    });
  };

  return (
    <div className="gpt3__daftar section__margin" id="wgpt3">
      <div className="gpt3__daftar-heading">
        <h3 className="gradient__text">
          UPDATE DATA USER LOGIN BPFK/IPFK - RMC / UNIT PEMELIHARAAN PERALATAN
          KESEHATAN
        </h3>
      </div>
      <div className="gpt3__header-content__input">
        <h3>Kode Fasyankes</h3>
        <input
          type="text"
          name="kode_institusi"
          defaultValue={data.kode_institusi}
          disabled = {true}
          background = "gray"
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Kategori</h3>
        <input
          type="text"
          id="jenis_user_id"
          name="jenis_user_id"
          // defaultValue={data.jenis_user.jenis_user}
          defaultValue={jenis}
          disabled
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Nama Institusi</h3>
        <input
          type="text"
          name="nama_institusi"
          defaultValue={data.nama_institusi}
          placeholder="Nama Institusi"
          disabled
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Propinsi</h3>
        <input
          type="text"
          name="propinsi_id"
          // defaultValue={data.propinsi.nama_prop}
          defaultValue={propinsi}
          disabled
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Kab/Kota</h3>
        <input
          type="text"
          name="kabkota"
          // defaultValue={data.ketum.nama_kota}
          defaultValue={kota}
          disabled
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Alamat</h3>
        <input
          type="text"
          name="alamat"
          defaultValue={data.alamat}
          placeholder="Alamat"
          disabled
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Kepemilikan</h3>
        <input
          type="text"
          name="kepemilikan_id"
          defaultValue={kepemilikan}
          // defaultValue={data.kepemilikan.jenis_kepemilikan}
          disabled
        />
      </div>
      {/* sampesini disable */}
      <div className="gpt3__header-content__input">
        <h3>No. Telepon Institusi</h3>
        <input
          min={0}
          maxLength={12}
          onInput={(e) => maxLengthCheck(e)}
          type="number"
          name="no_telp"
          defaultValue={data.no_telp}
          placeholder="No. Telepon"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Website</h3>
        <input
          type="text"
          name="website"
          defaultValue={data.website}
          placeholder="Website"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Media Sosial</h3>
        <input
          type="text"
          name="media_sosial"
          defaultValue={data.media_sosial}
          placeholder="Media Sosial"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Nama Pimpinan/ Penanggung Jawab</h3>
        <input
          type="text"
          name="nama_pj"
          defaultValue={data.nama_pj}
          placeholder="Nama Pimpinan/ Penanggung Jawab"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>PJ Laboratorium Pengujian & Kalibrasi</h3>
        <input
          type="text"
          name="nama_pj_lab_kalibrasi"
          defaultValue={data.nama_pj_lab_kalibrasi}
          placeholder="PJ Laboratorium Pengujian & Kalibrasi"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>PJ Mutu Teknis & Manajemen Pelayanan</h3>
        <input
          type="text"
          name="nama_pj_mutu"
          defaultValue={data.nama_pj_mutu}
          placeholder="PJ Mutu Teknis & Manajemen Pelayanan"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Narahubung Institusi</h3>
        <input
          min={0}
          maxLength={12}
          onInput={(e) => maxLengthCheck(e)}
          type="number"
          name="contact_person"
          defaultValue={data.contact_person}
          placeholder="Contact Person"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Nomor Izin Operasional</h3>
        <input
          type="text"
          name="nomor_izin_operasional"
          defaultValue={data.nomor_izin_operasional}
          placeholder="Nomor Izin Operasional"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Tanggal Izin Operasional</h3>
        <input
          type="date"
          name="tanggal_izin_operasional"
          defaultValue={data.tanggal_izin_operasional}
          placeholder="Tanggal Izin Operasional"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="gpt3__header-content__input">
        <h3>Email</h3>
        <input
          type="text"
          name="email"
          placeholder="Email"
          defaultValue={data.email}
          onChange={(e) => changeHandler(e)}
          disabled
        />
      </div>
      {/* <div className="gpt3__header-content__input">
                <h3 >Dokumen Izin Operasional</h3>
                value={}<input type="file" name="dokumen_izin_operasional" 
                placeholder="Dokumen Izin Operasional" />
            </div> */}
      <div className="gpt3__header-content__input" style={{ display: "flex" }}>
        <button type="button" style={{ marginLeft: "auto" }} onClick={batal}>
          Batal
        </button>
        <button type="button" style={{ marginLeft: "30px" }} onClick={simpan}>
          Simpan
        </button>
      </div>

      {/* <div className="gpt3__daftar-container">
            <Feature title="Chatbots" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought." />
            <Feature title="Knowledgebase" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
            <Feature title="Education" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
            </div> */}
    </div>
  );
};

export default Update;
