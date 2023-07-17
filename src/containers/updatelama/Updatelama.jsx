import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Feature from '../../components/feature/Feature';
import './update.css';

const Updatelama = () => {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function refreshPage() {
        window.location.reload(false);
    }

    const simpan = () => {
        confirmAlert({
            title: 'Konfirmasi Simpan Data',
            message: 'Apakah Anda Yakin? ',
            buttons: [
                {
                    label: 'Ya',
                    onClick: () => {
                        alert('Registrasi User Berhasil, mohon tunggu, sedang proses validasi, password anda akan dikirimkan melalui email terdaftar.')
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
                        refreshPage()
                    }
                },
                {
                    label: 'Tidak'
                }
            ]
        })
    }

    return (
        <div className="gpt3__update section__margin" id="wgpt3">
            <div className="gpt3__update-heading">
                <h3 className="gradient__text">Update Data</h3>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kode</h3>
                <input type="text" name="kode" placeholder="Kode" value="170000000000000000" disabled={true} />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kategori</h3>
                {/* <input type="text" name="kategori" placeholder="Kategori" /> */}
                <select name="kategori" id="kategori" disabled={true}>
                    <option value="1">BPFK</option>
                    <option value="2">IPFK</option>
                    <option value="3">RMC</option>
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Nama Satker</h3>
                <input type="text" name="nama_satker" placeholder="Nama Satker" value="" disabled={true}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Propinsi</h3>
                <select name="propinsi" id="propinsi" disabled={true}>
                    <option value="1">Pilih</option>
                    <option value="2">Aceh</option>
                    <option value="3">Bengkulu</option>
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kab/Kota</h3>
                <select name="kota" id="kota" disabled={true}>
                    <option value="1">Pilih</option>
                    <option value="2"></option>
                    <option value="3"></option>
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Alamat</h3>
                <input type="text" name="alamat" placeholder="Alamat" value="" disabled={true}/>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Kepemilikan</h3>
                <select name="kepemilikan" id="kepemilikan" disabled={true}>
                    <option value="1">Kemenkes</option>
                    <option value="2">Pemprov</option>
                    <option value="3">Pemkot/Pemkab</option>
                </select>
            </div>
            <div className="gpt3__header-content__input">
                <h3 >No. Telepon</h3>
                <input type="text" name="no_telp" placeholder="No. Telepon" />
                {/* <button type="text" name="button">Get Started</button> */}
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Website</h3>
                <input type="text" name="website" placeholder="Website" />
                {/* <button type="text" name="button">Get Started</button> */}
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Media Sosial</h3>
                <input type="text" name="media_sosial" placeholder="Media Sosial" />
                {/* <button type="text" name="button">Get Started</button> */}
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Nama Pimpinan/ Penanggung Jawab</h3>
                <input type="text" name="nama_pj" placeholder="Nama Pimpinan/ Penanggung Jawab" />
                {/* <button type="text" name="button">Get Started</button> */}
            </div>
            <div className="gpt3__header-content__input">
                <h3 >PJ Laboratorium Pengujian & Kalibrasi</h3>
                <input type="text" name="nama_pj_lab_kalibrasi" placeholder="PJ Laboratorium Pengujian & Kalibrasi" />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >PJ Mutu Teknis & Manajemen Pelayanan</h3>
                <input type="text" name="nama_pj_mutu" placeholder="PJ Mutu Teknis & Manajemen Pelayanan" />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Contact Person</h3>
                <input type="text" name="contact_person" placeholder="Contact Person" />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Nomor Izin Operasional</h3>
                <input type="text" name="nomor_izin_operasional" placeholder="Nomor Izin Operasional" />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Tanggal Izin Operasional</h3>
                <input type="text" name="tanggal_izin_operasional" placeholder="Tanggal Izin Operasional" />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Email</h3>
                <input type="text" name="email" placeholder="Email" />
            </div>
            <div className="gpt3__header-content__input">
                <h3 >Dokumen Izin Operasional</h3>
                <input type="file" name="dokumen_izin_operasional" placeholder="Dokumen Izin Operasional" />
            </div>
            <div className="gpt3__header-content__input" style={{ display: "flex" }}>
                <button type="button" style={{ marginLeft: "auto" }} onClick={batal}>Batal</button>
                <button type="button" style={{ marginLeft: "30px"}} onClick={simpan}>Simpan</button>
            </div>
            
            {/* <div className="gpt3__update-container">
            <Feature title="Chatbots" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought." />
            <Feature title="Knowledgebase" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
            <Feature title="Education" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
            </div> */}
        </div>
    )
    
}

export default Updatelama;
