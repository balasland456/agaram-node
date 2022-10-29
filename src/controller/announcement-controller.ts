import { PagedData } from '../types';
import AnnouncementService from "../service/announcement-service";
import { NextFunction, Request, Response } from "express";
import { IResetPassword, IAnnouncement, ResponseDTO, statusCode } from "../types";

export default class AnnouncementController {
  private _announcement: AnnouncementService;

  constructor() {
    this._announcement = new AnnouncementService();
    
    this.addAnnouncement = this.addAnnouncement.bind(this);
    this.getallannouncements = this.getallannouncements.bind(this);
    this.updateAnnouncement = this.updateAnnouncement.bind(this);
    this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
  }

  async addAnnouncement(
    request: Request<IAnnouncement>,
    response: Response<ResponseDTO<IAnnouncement>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IAnnouncement>> | void> {
    try {
      const announcement = request.body;
      // saving
      const saved = await this._announcement.addAnnouncement(announcement);

      const responseDTO = new ResponseDTO<IAnnouncement>(
        statusCode.CREATED,
        true,
        saved,
        null
      );

      return response.status(statusCode.CREATED).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  async updateAnnouncement(
    request: Request<IAnnouncement>,
    response: Response<ResponseDTO<IAnnouncement>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IAnnouncement>> | void> {
    try {
      const { _id } = request.params;
      const announcement: IAnnouncement = request.body;
      // saving
      const saved = await this._announcement.updateAnnouncement(
        {
          ...announcement
        }, _id);

      const responseDTO = new ResponseDTO<IAnnouncement>(
        statusCode.OK,
        true,
        saved,
        null
      );

      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  async getallannouncements(
    request: Request,
    response: Response<ResponseDTO<PagedData<IAnnouncement>>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<PagedData<IAnnouncement>>> | void> {
    try {
      const allannouncement = await this._announcement.getallannouncements();
      const responseDTO = new ResponseDTO<PagedData<IAnnouncement>>(
        statusCode.OK,
        true,
        allannouncement,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
  async deleteAnnouncement(
    request: Request<IAnnouncement>,
    response: Response<ResponseDTO<IAnnouncement>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IAnnouncement>> | void> {
    try {
      const { _id } = request.params;
      const deleteAnnouncement = await this._announcement.deleteAnnouncement(_id);
      const responseDTO = new ResponseDTO<IAnnouncement>(
        statusCode.OK,
        true,
        deleteAnnouncement,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
}
