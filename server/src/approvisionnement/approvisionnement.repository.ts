import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { BaseRepository } from "src/shared/repository/base-repository";
import { DataSource } from "typeorm";
import { Approvisionnement } from "./entities/approvisionnement.entity";

@Injectable({ scope: Scope.REQUEST })
export class ApprovisionnementRepository extends BaseRepository
{
    constructor(dataSource: DataSource, @Inject(REQUEST) req: Request)
    {
        super(dataSource, req);
    }

    async create(approvisionnement)
    {
        return this.getRepository(Approvisionnement).create(approvisionnement);
    }

    async createMany(approvisionnements)
    {
        return this.getRepository(Approvisionnement).create(approvisionnements);
    }

    async save(approvisionnement)
    {
        return this.getRepository(Approvisionnement).save(approvisionnement);
    }

    async saveMany(approvisionnements)
    {
        return this.getRepository(Approvisionnement).save(approvisionnements);
    }

    async update(id, approvisionnement)
    {
        return this.getRepository(Approvisionnement).update(id, approvisionnement);
    }

    async getApprovisionnements()
    {
        return this.getRepository(Approvisionnement).find();
    }
}