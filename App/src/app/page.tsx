"use client"
import Header from "@/components/Header/Header";
import Add from '@/public/add.svg'
import Empty from '@/public/listEmpty.svg'
import Search from '@/public/search.svg'
import Trash from '@/public/trash.svg'
import Update from '@/public/update.svg'
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalTemplate from "@/components/Modal/Modal";
import { IMaskInput } from "react-imask";

type products = {
  id: number,
  nome: string,
  qtd: number,
  preco: number
}

export default function Product() {
  const [products, setProducts] = useState<products[]>()
  const [open, setOpen] = useState<boolean>(false)
  const [openUpdate, setOpenUpdate] = useState<boolean>(false)
  const [value, setValue] = useState<any>({
    nome: '',
    preco: undefined,
    qtd: undefined
  })

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get('http://localhost:3000/product?take=10&skip=0')
        setProducts(data)
      } catch (e) {
        console.log(e)
      }
    }
    )()
  }, [])

  const handleDeleteItem = async (id: number) => {
    try {
      const { data } = await axios.delete(`http://localhost:3001/product/${id}`)
      setProducts(data)
    } catch (e) {
      console.log(e)
    }
  }

  const formatarMoeda = (e: any) => {

    var v = e.target.value.replace(/\D/g, "");

    v = (v / 100).toFixed(2) + "";

    v = v.replace(".", ",");

    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");

    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");

    e.target.value = v;
    setValue({ ...value, [e.target.name]: v })
  }

  const handleInsertItem = async () => {
    const { nome, preco, qtd } = value
    try {
      const { data } = await axios.post(`http://localhost:3001/product`, {
        nome: nome,
        preco: Number(preco.replaceAll('.', '').replace(',', '.')),
        qtd: Number(qtd)
      })
      setProducts(data)
      setOpen(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleUpdateItem = async (id: number) => {
    const { nome, preco, qtd } = value
    try {
      const { data } = await axios.patch(`http://localhost:3001/product/${id}`, {
        nome: nome,
        preco: Number(preco.replaceAll('.', '').replace(',', '.')),
        qtd: Number(qtd)
      })
      setProducts(data)
      setOpenUpdate(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Header title='Configuração de Produtos' />
      <section className="p-4 grid grid-cols-2 gap-2 w-[90%]">
        <div>
          <button className="flex flex-row items-center w-[20%] hover:border rounded-[12px] p-2 hover:border-[#3efe65] hover:shadow-sm" onClick={() => setOpen(true)}>
            <Image src={Add} alt="icone de adicionar novo produto" width={30} />
            <p className="ml-2 hover:cursor-pointer">Criar novo</p>
          </button>
        </div>
        <div className="flex justify-end">
          <label htmlFor="search" className="flex flex-row items-center border w-[50%] rounded-[12px] p-1">
            <Image src={Search} alt="lupa" width={20} />
            <input type="text" name="search" id="search" placeholder="Buscar" className="ml-2 focus:outline-none w-[95%]" />
          </label>
        </div>
      </section>
      <main className="flex flex-col w-[90%] p-4 ">
        {products &&
          products?.map((item: any, index: number) => (
            <div className="grid grid-cols-2 gap-2 odd:bg-[#EBEFF5] pl-4 pb-4">
              <ul key={item?.id} className="flex flex-col items-start justify-center pt-[16px]">
                <li>{item?.nome.toUpperCase()}</li>
                <li className="flex"><p className="mr-1">Preço: R$</p> {item?.preco.toString().replace('.', ',')}</li>
                <li className="flex"><p className="mr-1">Estoque:</p> {item?.qtd}</li>
              </ul>
              <div className="flex flex-row items-center justify-end">
                <Image src={Update} alt="atualizar" width={30} className="mr-2 cursor-pointer" onClick={() => { setOpenUpdate(true), setValue(products[index]) }} />
                <Image src={Trash} alt="deletar" width={30} className="mr-4 cursor-pointer" onClick={() => handleDeleteItem(item.id)} />
              </div>
            </div>
          ))
        }
      </main>
      <ModalTemplate openModal={open} children={
        <div className="flex flex-col items-center justify-center">
          <p className="p-8 font-semibold text-[24px]">Adicionar novo produto</p>
          <label htmlFor="search" className="flex flex-row items-center border w-[30vw] rounded-[12px] p-1 mb-[24px]">
            <input type="text" name="nome" id="nome" placeholder="Nome" onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} value={value['nome']} className="ml-2 focus:outline-none w-[95%]" />
          </label>
          <label htmlFor="search" className="flex flex-row items-center border w-[30vw] rounded-[12px] p-1 mb-[24px]">
            <span className="text-[#adaba9]">R$</span>
            <input type="text" id="preco" name="preco" className="ml-2 focus:outline-none w-[95%]" onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} value={value['preco']} onKeyUp={(e) => formatarMoeda(e)} />
          </label>
          <label htmlFor="search" className="flex flex-row items-center border w-[30vw] rounded-[12px] p-1 mb-[24px]">
            <input type="number" name="qtd" id="qtd" value={value['qtd']} onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} placeholder="Estoque" className="ml-2 focus:outline-none w-[95%]" />
          </label>

          <div className="flex flex-row items-center justify-evelyn">
            <button onClick={() => handleInsertItem()} className="mr-[16px] p-4 bg-[#3efe65] text-white font-semibold rounded-[12px]">Enviar</button>
            <button onClick={() => setOpen(false)} className="ml-[16px] p-4 bg-[#ef0101] text-white font-semibold rounded-[12px]">Cancelar</button>
          </div>
        </div>
      } />

      <ModalTemplate openModal={openUpdate} children={
        <div className="flex flex-col items-center justify-center">
          <p className="p-8 font-semibold text-[24px]">Adicionar novo produto</p>
          <label htmlFor="search" className="flex flex-row items-center border w-[30vw] rounded-[12px] p-1 mb-[24px]">
            <input type="text" name="nome" id="nome" placeholder="Nome" onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} value={value.nome} className="ml-2 focus:outline-none w-[95%]" />
          </label>
          <label htmlFor="search" className="flex flex-row items-center border w-[30vw] rounded-[12px] p-1 mb-[24px]">
            <span className="text-[#adaba9]">R$</span>
            <input type="text" id="preco" name="preco" className="ml-2 focus:outline-none w-[95%]" onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} value={value.preco} onKeyUp={(e) => formatarMoeda(e)} />
          </label>
          <label htmlFor="search" className="flex flex-row items-center border w-[30vw] rounded-[12px] p-1 mb-[24px]">
            <input type="number" name="qtd" id="qtd" value={value.qtd} onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} placeholder="Estoque" className="ml-2 focus:outline-none w-[95%]" />
          </label>

          <div className="flex flex-row items-center justify-evelyn">
            <button onClick={() => handleUpdateItem(value.id)} className="mr-[16px] p-4 bg-[#3efe65] text-white font-semibold rounded-[12px]">Enviar</button>
            <button onClick={() => setOpenUpdate(false)} className="ml-[16px] p-4 bg-[#ef0101] text-white font-semibold rounded-[12px]">Cancelar</button>
          </div>
        </div>
      } />
      {!products && <span className="flex flex-row items-center h-[70vh] text-[#adaba9]">Ops, você não possue produtos cadastrados <Image src={Empty} alt="lista vazia" width={40} className="ml-2" />  </span>}

    </>
  );
}
