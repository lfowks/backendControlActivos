import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activo } from 'src/Entities/activo.entity';
import { Ubicacion } from 'src/Entities/ubicacion.entity';
import { Repository } from 'typeorm';
import { CreateActivoDTO } from './dto/create-activo.dto';
import { UpdateActivoDTO } from './dto/update-activo.dto';
import { Ley } from 'src/Entities/ley.entity'; // Importamos la entidad Ley
import * as bwipjs from 'bwip-js';
import { Response } from 'express';  // Importa el Response de Express para enviar la imagen

@Injectable()
export class ActivoService {
  constructor(
    @InjectRepository(Ubicacion)
    private ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(Activo)
    private activoRepository: Repository<Activo>,
    @InjectRepository(Ley)
    private leyRepository: Repository<Ley> // Repositorio de Ley
  ) {}

  // Crear activo con posibilidad de adquisición por ley
  async createActivo(createActivoDTO: CreateActivoDTO): Promise<Activo> {
    const { ubicacionId, modoAdquisicion, leyId } = createActivoDTO;

    const ubicacion = await this.ubicacionRepository.findOne({ where: { id: ubicacionId } });

    if (!ubicacion) {
      throw new NotFoundException('Ubicación no encontrada');
    }

    let ley = null;
    if (modoAdquisicion === 'Ley' && leyId) {
      ley = await this.leyRepository.findOne({ where: { id: leyId } });
      if (!ley) {
        throw new NotFoundException('Ley no encontrada');
      }
    }

    const newActivo = this.activoRepository.create({
      ...createActivoDTO,
      ubicacion,
      ley, // Solo si el modo es "Ley"
    });

    return await this.activoRepository.save(newActivo);
  }

  async getAllActivos(): Promise<Activo[]> {
    return await this.activoRepository.find({ relations: ['ubicacion', 'ley'] });
  }

  async getActivo(id: number): Promise<Activo> {
    const activo = await this.activoRepository.findOne({ where: { id }, relations: ['ubicacion', 'ley'] });

    if (!activo) {
      throw new NotFoundException(`Activo con ID ${id} no encontrado`);
    }
    return activo;
  }

  async getActivosByUbicacion(ubicacionId: number): Promise<Activo[]> {
    const activos = await this.activoRepository.find({ where: { ubicacion: { id: ubicacionId } }, relations: ['ubicacion', 'ley'] });

    if (!activos.length) {
      throw new NotFoundException(`No se encontraron activos para la ubicación con ID ${ubicacionId}`);
    }

    return activos;
  }

  async updateActivo(id: number, updateActivoDTO: UpdateActivoDTO): Promise<Activo> {
    const activo = await this.activoRepository.findOne({ where: { id } });

    if (!activo) {
      throw new NotFoundException(`Activo con ID ${id} no encontrado`);
    }

    if (updateActivoDTO.ubicacionId) {
      const ubicacion = await this.ubicacionRepository.findOne({ where: { id: updateActivoDTO.ubicacionId } });

      if (!ubicacion) {
        throw new NotFoundException('Ubicación no encontrada');
      }
      activo.ubicacion = ubicacion;
    }

    if (updateActivoDTO.modoAdquisicion === 'Ley' && updateActivoDTO.leyId) {
      const ley = await this.leyRepository.findOne({ where: { id: updateActivoDTO.leyId } });

      if (!ley) {
        throw new NotFoundException('Ley no encontrada');
      }
      activo.ley = ley;
    }

    Object.assign(activo, updateActivoDTO);

    return await this.activoRepository.save(activo);
  }

  async deleteActivo(id: number): Promise<void> {
    const result = await this.activoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Activo con ID ${id} no encontrado`);
    }
  }

  // Lógica para generar el código de barras
  async generateBarcode(numPlaca: string, res: Response): Promise<void> {
    try {
      bwipjs.toBuffer({
        bcid: 'code128',       // Formato de código de barras
        text: numPlaca,        // El número de placa
        scale: 3,              // Escala
        height: 10,            // Altura del código de barras
        includetext: true,     // Incluir el texto del número de placa
        textxalign: 'center',  // Alineación del texto
      }, (err, png) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.setHeader('Content-Type', 'image/png');
          res.send(png);
        }
      });
    } catch (error) {
      res.status(500).send('Error generando el código de barras');
    }
  }
}
